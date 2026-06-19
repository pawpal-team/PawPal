import { verifyJwt } from '../utils/jwt.js'

function getBearerToken(authorizationHeader) {
  if (!authorizationHeader) {
    return null
  }

  const [scheme, token] = authorizationHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return null
  }

  return token
}

export function authenticateToken(req, res, next) {
  const token = getBearerToken(req.headers.authorization)

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const payload = verifyJwt(token, process.env.JWT_SECRET || 'test-secret')
    const userId = payload.userId || payload.id || payload.sub

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.userId = Number(userId)
    return next()
  } catch {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
