import { z } from 'zod'

const VALID_TYPES = ['vet', 'vaccine', 'grooming', 'medication', 'bath', 'training', 'other']

const typeField = z.enum(VALID_TYPES, {
  error: () => `type 必須為：${VALID_TYPES.join(', ')}`,
})

const notesField = z
  .string()
  .max(100, { error: 'notes 不得超過 100 字' })
  .optional()

const eventDateField = z
  .string({ error: 'eventDate 為必填' })
  .regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'eventDate 格式必須為 YYYY-MM-DD' })

export const createCalendarEventSchema = z.object({
  petId: z.number({ error: 'petId、title、eventDate、type 為必填' }).int().positive(),
  title: z
    .string({ error: 'petId、title、eventDate、type 為必填' })
    .trim()
    .min(1, { error: 'petId、title、eventDate、type 為必填' })
    .max(255, { error: 'title 不得超過 255 字' }),
  eventDate: eventDateField,
  eventTime: z.string().optional(),
  type: typeField,
  location: z.string().max(255, { error: 'location 不得超過 255 字' }).optional(),
  notes: notesField,
})

export const updateCalendarEventSchema = z.object({
  title: z.string().optional(),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'eventDate 格式必須為 YYYY-MM-DD' })
    .optional(),
  eventTime: z.string().optional(),
  type: typeField.optional(),
  location: z.string().max(255, { error: 'location 不得超過 255 字' }).optional(),
  notes: notesField,
  isCompleted: z.boolean().optional(),
})
