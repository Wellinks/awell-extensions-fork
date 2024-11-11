import { z } from 'zod'
import { type Action, Category, validate } from '@awell-health/extensions-core'
import { SettingsValidationSchema, type settings } from '../../settings'
import { makeAPIClient } from '../../client'
import { AxiosError } from 'axios'
import { fields, FieldsValidationSchema, dataPoints } from './config'

export const addAllergy: Action<
  typeof fields,
  typeof settings,
  keyof typeof dataPoints
> = {
  key: 'addAllergy',
  category: Category.EHR_INTEGRATIONS,
  title: 'Add Allergy',
  description:
    'Adds allergy to the patient profile. If allergy.name is NKDA, we will document a structured NKDA in the patient chart instead of creating a patient allergy called "NKDA"',
  fields,
  previewable: true,
  dataPoints,
  onEvent: async ({ payload, onComplete, onError }): Promise<void> => {
    const { fields, settings } = validate({
      schema: z.object({
        fields: FieldsValidationSchema,
        settings: SettingsValidationSchema,
      }),
      payload,
    })

    const api = makeAPIClient(settings)

    try {
      const { id } = await api.addAllergy({
        patient: fields.patientId,
        name: fields.name,
        start_date: fields.startDate,
        reaction: fields.reaction,
        severity: fields.severity,
      })

      await onComplete({
        data_points: {
          allergyId: String(id),
        },
      })
    } catch (err) {
      if (err instanceof AxiosError) {
        await onError({
          events: [
            {
              date: new Date().toISOString(),
              text: {
                en: `${err.status ?? '(no status code)'} Error: ${err.message}`,
              },
              error: {
                category: 'SERVER_ERROR',
                message: `${err.status ?? '(no status code)'} Error: ${
                  err.message
                }`,
              },
            },
          ],
        })
      } else {
        // Handles Zod and other unknown errors
        throw err
      }
    }
  },
}