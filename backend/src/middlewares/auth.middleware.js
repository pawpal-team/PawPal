import jwt from 'jsonwebtoken'

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
  const jwtSecret = process.env.JWT_SECRET

  if (!token || !jwtSecret) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token, jwtSecret)
    const userId = Number(payload.sub)

    if (!Number.isSafeInteger(userId) || userId <= 0) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.userId = userId
    return next()
  } catch {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
