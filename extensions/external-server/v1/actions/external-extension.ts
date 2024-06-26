import {
  type Action,
  type Fields,
  type Field,
  type DataPointDefinition,
  FieldType,
} from '@awell-health/extensions-core'
import { Category } from '@awell-health/extensions-core'
import { type settings } from '../../settings'
import { z } from 'zod'
import axios from 'axios'

const fields: Fields = {
  extension: {
    type: FieldType.STRING,
    id: 'extension',
    label: 'Extension Key',
    description: 'The key of the extension you want to use',
    required: true,
  },
  action: {
    type: FieldType.STRING,
    id: 'action',
    label: 'Action Key',
    description: 'The key of the action you want to use',
    required: true,
  },
  input: {
    type: FieldType.JSON,
    id: 'input',
    label: 'Input',
    description:
      "The input (in JSON format: {'fields': {key: val}, 'settings': {key: val}})",
  },
} satisfies Record<string, Field>

const dataPoints = {
  data_points: {
    key: 'data_points',
    valueType: 'string',
  },
} satisfies Record<string, DataPointDefinition>

const PayloadSchema = z.object({
  fields: z.object({
    extension: z.string(),
    action: z.string(),
    input: z.any(),
  }),
  settings: z.object({
    url: z.string(),
  }),
})

export const externalServer: Action<
  typeof fields,
  typeof settings,
  keyof typeof dataPoints
> = {
  key: 'externalServer',
  title: 'External Server',
  description:
    'An extension action used to prototype extensions on your local machine.',
  category: Category.DATA,
  fields,
  dataPoints,
  previewable: true,
  onActivityCreated: async (payload, onComplete, onError) => {
    const { fields, settings } = PayloadSchema.parse(payload)
    const clientPayload = fields.input ?? { fields: {}, settings: {} }
    const { data, status } = await axios.post<{
      data_points: any
      events: any
      response: 'success' | 'failure'
    }>(
      `${settings.url}/${fields.extension}/${fields.action}`,
      { data: clientPayload },
      { headers: { 'Content-Type': 'application/json' } }
    )
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { data_points, events, response } = data
    if (status === 200 && response === 'success') {
      await onComplete({
        data_points: { data_points: JSON.stringify(data_points) },
      })
    } else {
      await onError({ events })
    }
  },
}
