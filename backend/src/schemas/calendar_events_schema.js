import { z } from 'zod'

const VALID_TYPES = ['vet', 'vaccine', 'grooming', 'medication', 'bath', 'training', 'other']

const typeField = z.enum(VALID_TYPES, {
  error: () => `type 必須為：${VALID_TYPES.join(', ')}`,
})

const notesField = z
  .string()
  .max(100, { error: 'notes 不得超過 100 字' })
  .optional()

const eventTimeField = z
  .string()
  .regex(/^\d{2}:\d{2}$/, { error: 'eventTime 格式必須為 HH:MM' })
  .optional()

const eventDateField = z
  .string({ error: 'eventDate 為必填' })
  .regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'eventDate 格式必須為 YYYY-MM-DD' })

export const createCalendarEventSchema = z.object({
  petId: z.number({ error: 'petId 為必填' }).int().positive({ error: 'petId 必須為正整數' }),
  title: z
    .string({ error: 'title 為必填' })
    .trim()
    .min(1, { error: 'title 不得為空' })
    .max(255, { error: 'title 不得超過 255 字' }),
  eventDate: eventDateField,
  eventTime: eventTimeField,
  type: typeField,
  location: z.string().max(255, { error: 'location 不得超過 255 字' }).optional(),
  notes: notesField,
})

export const calendarEventParamsSchema = z.object({
  id: z.coerce.number().int().positive({ error: 'id 必須為正整數' }),
})

export const updateCalendarEventSchema = z.object({
  title: z.string().trim().min(1, { error: 'title 不得為空' }).optional(),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'eventDate 格式必須為 YYYY-MM-DD' })
    .optional(),
  eventTime: eventTimeField,
  type: typeField.optional(),
  location: z.string().max(255, { error: 'location 不得超過 255 字' }).optional(),
  notes: notesField,
  isCompleted: z.boolean().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: '至少需要提供一個欄位' }
)
