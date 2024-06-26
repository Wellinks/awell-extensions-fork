import {
  type Field,
  FieldType,
  makeStringOptional,
} from '@awell-health/extensions-core'
import { type ZodTypeAny, z } from 'zod'

export const fields = {
  productId: {
    id: 'productId',
    label: 'Product Id',
    description: 'E.g. 12345678-1234-1234-1234-123456789abc',
    type: FieldType.STRING,
    required: true,
  },
  feedbackEmail: {
    id: 'feedbackEmail',
    label: 'Feedback Email',
    description: 'Send a report to this address when the fax is sent',
    type: FieldType.STRING,
    required: false,
  },
  number: {
    id: 'number',
    label: 'Number',
    description: 'Destination fax number',
    type: FieldType.STRING,
    required: true,
  },
  addFaceSheet: {
    id: 'addFaceSheet',
    label: 'Add face sheet',
    description: 'Add cover sheet that precedes the actual message or document',
    type: FieldType.BOOLEAN,
    required: false,
  },
  content: {
    id: 'content',
    label: 'Fax content',
    description: 'Content of the fax',
    type: FieldType.HTML,
    required: false,
  },
} satisfies Record<string, Field>

export const FieldsValidationSchema = z.object({
  productId: z.string().min(1),
  feedbackEmail: makeStringOptional(z.string()),
  number: z.string().min(1),
  content: z.string().min(1),
  addFaceSheet: z.boolean().optional(),
} satisfies Record<keyof typeof fields, ZodTypeAny>)
