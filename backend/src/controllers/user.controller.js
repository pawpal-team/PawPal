import { findUserById } from '../services/user.service.js'

export function createGetCurrentUser({ findUserById }) {
  return async function getCurrentUser(req, res) {
    try {
      const user = await findUserById(req.userId)

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      return res.status(200).json({ user })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: 'Failed to get current user' })
    }
  }
}

export const getCurrentUser = createGetCurrentUser({ findUserById })
