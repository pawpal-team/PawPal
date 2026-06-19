import crypto from 'node:crypto'

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '')
}

function base64UrlDecode(value) {
  const normalized = value.replaceAll('-', '+').replaceAll('_', '/')
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=')

  return Buffer.from(padded, 'base64').toString('utf8')
}

function createSignature(input, secret) {
  return crypto.createHmac('sha256', secret).update(input).digest('base64url')
}

export function signJwt(payload, secret) {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = createSignature(`${encodedHeader}.${encodedPayload}`, secret)

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

export function verifyJwt(token, secret) {
  const parts = token.split('.')

  if (parts.length !== 3) {
    throw new Error('Invalid token')
  }

  const [encodedHeader, encodedPayload, signature] = parts
  const expectedSignature = createSignature(`${encodedHeader}.${encodedPayload}`, secret)
  const signatureBuffer = Buffer.from(signature)
  const expectedSignatureBuffer = Buffer.from(expectedSignature)

  if (
    signatureBuffer.length !== expectedSignatureBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
  ) {
    throw new Error('Invalid token')
  }

  const header = JSON.parse(base64UrlDecode(encodedHeader))

  if (header.alg !== 'HS256') {
    throw new Error('Unsupported token algorithm')
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload))
  const now = Math.floor(Date.now() / 1000)

  if (payload.exp && payload.exp < now) {
    throw new Error('Token expired')
  }

  return payload
}
