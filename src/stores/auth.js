import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mockUsers } from '@/data/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = ref(false)

  function login(email, password) {
    const foundUser = mockUsers.find((user) => user.email === email && user.password === password)

    if (foundUser) {
      user.value = foundUser
      isLoggedIn.value = true
      return true
    }

    return false
  }

  function logout() {
    user.value = null
    isLoggedIn.value = false
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
})
