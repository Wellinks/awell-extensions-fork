import { z } from 'zod'

const SettingsSchema = z.object({
  apiKey: z.string().nonempty('Missing API key'),
})

const GetBookingFieldsSchema = z.object({
  bookingId: z.string().nonempty('Missing bookingId'),
})

export const GetBookingPayloadSchema = z.object({
  fields: GetBookingFieldsSchema,
  settings: SettingsSchema,
})
//

// Leaving this and part of booking schema commented out, just in case we want to use it
// it is a part of api response but we don't use it right now
// const UserSchema = z.object({
//   email: z.string(),
//   name: z.string(),
//   timeZone: z.string(),
//   locale: z.string().optional().nullable(),
// })

// export type User = z.infer<typeof UserSchema>

export const BookingSchema = z.object({
  eventTypeId: z.number(),
  title: z.string(),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.string(),
  uid: z.string(),
  //   id: z.number(),
  //   userId: z.number(),
  //   user: UserSchema,
  //   attendees: z.array(UserSchema),
  //   metadata: z.record(z.unknown()),
})

export const GetBookingResponseSchema = z.object({
  booking: BookingSchema,
})

export type Booking = z.infer<typeof BookingSchema>