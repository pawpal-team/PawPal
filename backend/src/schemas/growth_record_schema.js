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
  pet_id: z.number({ error: '請提供有效的寵物 ID' }).int().positive(),
  metric_type: z.enum(METRIC_TYPES, { error: '不支援此量測類型' }),
  value: z.number({ error: '數值不能為負數' }).nonnegative(),
  unit: z
    .string({ error: '請填寫單位' })
    .trim()
    .min(1, { error: '請填寫單位' })
    .max(20, { error: '單位名稱過長（最多 20 字元）' }),
  recorded_at: z.string({ error: '請填寫記錄時間' }).trim().min(1, { error: '請填寫記錄時間' }),
  notes: z.string({ error: '備註格式不正確' }).trim().optional(),
})

export const updateGrowthRecordSchema = z.object({
  value: z.number({ error: '數值不能為負數' }).nonnegative(),
  unit: z
    .string({ error: '請填寫單位' })
    .trim()
    .min(1, { error: '請填寫單位' })
    .max(20, { error: '單位名稱過長（最多 20 字元）' }),
  recorded_at: z.string({ error: '請填寫記錄時間' }).trim().min(1, { error: '請填寫記錄時間' }),
  notes: z.string({ error: '備註格式不正確' }).trim().optional(),
})
