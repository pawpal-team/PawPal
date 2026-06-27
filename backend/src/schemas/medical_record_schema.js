import { z } from 'zod'

export const createRecordSchema = z.object({
  pet_id: z.number({
    required_error: '請選擇寵物',
    invalid_type_error: '寵物 ID 必須是數字',
  }),
  record_type: z.enum(['看診', '疫苗', '手術', '用藥', '體檢', '其他'], {
    required_error: '請選擇紀錄類型',
    invalid_type_error: '請選擇正確的紀錄類型（看診、疫苗、手術、用藥、體檢、其他）',
  }),
  hospital_name: z.string().trim().optional().default(''),
  title: z.string({ required_error: '請填寫標題' }).trim().min(1, '標題不能為空白'),
  record_date: z.string({ required_error: '請選擇日期' }).refine((val) => !isNaN(Date.parse(val)), {
    message: '請輸入正確的日期格式 (YYYY-MM-DD)',
  }),
  symptoms: z.string().trim().optional().default(''),
  diagnosis: z.string().trim().optional().default(''),
  prescription: z.string().trim().optional().default(''),
  image_url: z.array(z.string()).optional().default([]),
})

export const updateRecordSchema = z.object({
  pet_id: z.number({ invalid_type_error: '寵物 ID 必須是數字' }).optional(),
  record_type: z
    .enum(['看診', '疫苗', '手術', '用藥', '體檢', '其他'], {
      invalid_type_error: '請選擇正確的紀錄類型',
    })
    .optional(),
  hospital_name: z.string().trim().optional(),
  title: z.string().trim().min(1, '標題不能為空白').optional(),
  record_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: '請輸入正確的日期格式 (YYYY-MM-DD)',
    })
    .optional(),
  symptoms: z.string().trim().optional(),
  diagnosis: z.string().trim().optional(),
  prescription: z.string().trim().optional(),
  image_url: z.array(z.string()).optional(),
})
