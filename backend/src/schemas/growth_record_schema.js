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
  pet_id: z
    .number({
      error: (issue) => (issue.input === undefined ? '請選擇寵物' : '寵物 ID 必須是數字'),
    })
    .int({ error: '寵物 ID 必須為整數' })
    .positive({ error: '寵物 ID 必須大於 0' }),
  metric_type: z.enum(METRIC_TYPES, {
    error: '請選擇要記錄的項目',
  }),
  value: z.number({ error: '請輸入數值' }).nonnegative({ error: '數值不能為負數' }),
  unit: z
    .string({ error: '請填寫單位' })
    .trim()
    .min(1, { error: '請填寫單位' })
    .max(20, { error: '單位名稱過長' }),
  recorded_at: z.string({ error: '請填寫紀錄時間' }).trim().min(1, { error: '請填寫紀錄時間' }),
  notes: z.string({ error: '請在備註中填寫文字內容' }).trim().optional(),
})

export const updateGrowthRecordSchema = z
  .object({
    value: z.number({ error: '請輸入數值' }).nonnegative({ error: '數值不能為負數' }).optional(),
    unit: z
      .string({ error: '請填寫單位' })
      .trim()
      .min(1, { error: '請填寫單位' })
      .max(20, { error: '單位名稱過長' })
      .optional(),
    recorded_at: z
      .string({ error: '請填寫紀錄時間' })
      .trim()
      .min(1, { error: '請填寫紀錄時間' })
      .optional(),
    notes: z.string({ error: '請在備註中填寫文字內容' }).trim().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: '請至少填寫一個要更新的欄位',
  })
