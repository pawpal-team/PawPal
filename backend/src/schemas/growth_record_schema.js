import { z } from 'zod'

export const METRIC_TYPES = [
  'weight',
  'length',
  'water_frequency',
  'food_intake',
  'urination',
  'defecation',
]

export const createGrowthRecordSchema = z.object({
  pet_id: z.number({ error: 'pet_id must be a positive integer' }).int().positive(),
  metric_type: z.enum(METRIC_TYPES, { error: 'Invalid metric type' }),
  value: z.number({ error: 'value must be a non-negative number' }).nonnegative(),
  unit: z
    .string({ error: 'unit is required' })
    .trim()
    .min(1, { error: 'unit is required' })
    .max(20, { error: 'unit is too long' }),
  recorded_at: z
    .string({ error: 'recorded_at is required' })
    .trim()
    .min(1, { error: 'recorded_at is required' }),
  notes: z.string({ error: 'notes must be a string' }).trim().optional(),
})

export const updateGrowthRecordSchema = z.object({
  value: z.number({ error: 'value must be a non-negative number' }).nonnegative(),
  unit: z
    .string({ error: 'unit is required' })
    .trim()
    .min(1, { error: 'unit is required' })
    .max(20, { error: 'unit is too long' }),
  recorded_at: z
    .string({ error: 'recorded_at is required' })
    .trim()
    .min(1, { error: 'recorded_at is required' }),
  notes: z.string({ error: 'notes must be a string' }).trim().optional(),
})
