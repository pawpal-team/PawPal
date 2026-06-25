import { z } from 'zod'

export const createRecordSchema = z.object({
  pet_id: z.number({
    required_error: 'pet_id is required',
    invalid_type_error: 'pet_id must be a number',
  }),
  record_type: z.enum(['看診', '疫苗', '手術', '用藥', '體檢', '其他'], {
    required_error: 'record_type is required',
    invalid_type_error:
      'Invalid record_type value. Must be one of: 看診, 疫苗, 手術, 用藥, 體檢, 其他',
  }),
  hospital_name: z.string().trim().optional().default(''),
  title: z
    .string({ required_error: 'title is required' })
    .trim()
    .min(1, 'title is required and cannot be empty'),
  record_date: z
    .string({ required_error: 'record_date is required' })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'record_date is required and must be a valid date format (YYYY-MM-DD)',
    }),
  symptoms: z.string().trim().optional().default(''),
  diagnosis: z.string().trim().optional().default(''),
  prescription: z.string().trim().optional().default(''),
  image_url: z.array(z.string()).optional().default([]),
})

export const updateRecordSchema = z.object({
  pet_id: z.number().optional(),
  record_type: z.enum(['看診', '疫苗', '手術', '用藥', '體檢', '其他']).optional(),
  hospital_name: z.string().trim().optional(),
  title: z.string().trim().min(1, 'title cannot be empty').optional(),
  record_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'record_date must be a valid date format (YYYY-MM-DD)',
    })
    .optional(),
  symptoms: z.string().trim().optional(),
  diagnosis: z.string().trim().optional(),
  prescription: z.string().trim().optional(),
  image_url: z.array(z.string()).optional(),
})
