import { findUserById } from '../services/user.service.js'

export async function getCurrentUser(req, res) {
  try {
    const findUser = req.services?.userService?.findUserById || findUserById
    const user = await findUser(req.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({ user })
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Failed to get current user' })
  }
}
