import * as defaultUserService from '../services/user.service.js'

export async function getCurrentUser(req, res) {
  const userService = req.services?.userService || defaultUserService
  const user = await userService.findUserById(req.userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json({ user })
}
