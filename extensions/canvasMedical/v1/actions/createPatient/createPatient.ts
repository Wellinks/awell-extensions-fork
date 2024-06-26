import { validate, type Action } from '@awell-health/extensions-core'
import { type settings } from '../../../settings'
import { Category } from '@awell-health/extensions-core'
import { fields, dataPoints, fieldsValidationSchema } from './config'
import {
  isAxiosError,
  isZodError,
  parseAxiosError,
  parseUnknowError,
  parseZodError,
} from '../../utils'
import { z } from 'zod'
import { type AxiosError } from 'axios'
import { makeAPIClient } from '../../client'
import { patientSchema } from '../../validation'

export const createPatient: Action<typeof fields, typeof settings> = {
  key: 'createPatient',
  category: Category.EHR_INTEGRATIONS,
  title: 'Create Patient',
  description: 'Create a patient',
  fields,
  dataPoints,
  previewable: true,
  onActivityCreated: async (payload, onComplete, onError) => {
    try {
      validate({
        schema: z.object({
          fields: fieldsValidationSchema,
        }),
        payload,
      })

      const patientData = patientSchema.parse(
        JSON.parse(payload.fields.patientData as string)
      )

      const api = makeAPIClient(payload.settings)
      const patientId = await api.createPatient(patientData)

      await onComplete({
        data_points: {
          patientId,
        },
      })
    } catch (error) {
      let parsedError

      if (isZodError(error)) {
        parsedError = parseZodError(error)
      } else if (isAxiosError(error)) {
        parsedError = parseAxiosError(error as AxiosError)
      } else {
        parsedError = parseUnknowError(error as Error)
      }
      await onError({
        events: [parsedError],
      })
    }
  },
}
