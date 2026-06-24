import { z } from 'zod'

const registerRequiredMessage = 'name, email, password are required'
const registerTypeMessage = 'name, email, password must be strings'
const loginRequiredMessage = 'email, password are required'
const loginTypeMessage = 'email, password must be strings'

function stringFieldError(requiredMessage, typeMessage) {
  return (issue) => (issue.input === undefined ? requiredMessage : typeMessage)
}

function createEmailField(requiredMessage, typeMessage) {
  return z
    .string({ error: stringFieldError(requiredMessage, typeMessage) })
    .trim()
    .min(1, { error: requiredMessage })
    .max(255, { error: 'email is too long' })
    .email({ error: 'invalid email format' })
    .transform((value) => value.toLowerCase())
}

function createPasswordField(requiredMessage, typeMessage) {
  return z
    .string({ error: stringFieldError(requiredMessage, typeMessage) })
    .trim()
    .min(1, { error: requiredMessage })
    .max(72, { error: 'password is too long' })
}

export const registerSchema = z.object({
  name: z
    .string({ error: stringFieldError(registerRequiredMessage, registerTypeMessage) })
    .trim()
    .min(1, { error: registerRequiredMessage })
    .max(100, { error: 'name is too long' }),
  email: createEmailField(registerRequiredMessage, registerTypeMessage),
  password: createPasswordField(registerRequiredMessage, registerTypeMessage),
})

export const loginSchema = z.object({
  email: createEmailField(loginRequiredMessage, loginTypeMessage),
  password: createPasswordField(loginRequiredMessage, loginTypeMessage),
})
