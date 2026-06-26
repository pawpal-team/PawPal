import { z } from 'zod'

const createRequiredMessage = 'name and species are required'

function requiredStringField(message, maxLength, tooLongMessage) {
  return z
    .string({ error: message })
    .trim()
    .min(1, { error: message })
    .max(maxLength, { error: tooLongMessage })
}

function optionalStringField(maxLength, tooLongMessage) {
  return z
    .string({ error: tooLongMessage })
    .trim()
    .max(maxLength, { error: tooLongMessage })
    .optional()
}

function optionalTextField() {
  return z.string({ error: 'notes must be a string' }).trim().optional()
}

function optionalUrlField() {
  return z.string({ error: 'avatar_url must be a string' }).trim().optional()
}

const petFieldsSchema = {
  name: optionalStringField(100, 'name is too long').refine((value) => value !== '', {
    error: 'name must be a non-empty string',
  }),
  species: optionalStringField(50, 'species is too long').refine((value) => value !== '', {
    error: 'species must be a non-empty string',
  }),
  breed: optionalStringField(100, 'breed is too long'),
  gender: optionalStringField(20, 'gender is too long'),
  birthday: optionalStringField(10, 'birthday is too long'),
  weight: z.number({ error: 'weight must be a number' }).nonnegative().optional(),
  microchip_number: optionalStringField(50, 'microchip_number is too long'),
  neutered: z.boolean({ error: 'neutered must be a boolean' }).optional(),
  blood_type: optionalStringField(20, 'blood_type is too long'),
  fur_color: optionalStringField(100, 'fur_color is too long'),
  notes: optionalTextField(),
  avatar_url: optionalUrlField(),
}

export const createPetSchema = z.object({
  ...petFieldsSchema,
  name: requiredStringField(createRequiredMessage, 100, 'name is too long'),
  species: requiredStringField(createRequiredMessage, 50, 'species is too long'),
})

export const updatePetSchema = z.object(petFieldsSchema).refine((value) => Object.keys(value).length > 0, {
  error: 'At least one pet field is required',
})
