import { findUserById } from '../services/user.service.js'

export async function getCurrentUser(req, res) {
  const findUser = req.services?.userService?.findUserById || findUserById
  const user = await findUser(req.userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json({ user })
}
