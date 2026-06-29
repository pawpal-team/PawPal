import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { login as loginApi, register as registerApi } from '@/api/auth.js'

const TOKEN_STORAGE_KEY = 'pawpal_token'
const USER_STORAGE_KEY = 'pawpal_user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_STORAGE_KEY) || '')
  const user = ref(readStoredUser())
  const isLoggedIn = computed(() => Boolean(token.value))

  function register(payload) {
    return registerApi(payload)
  }

  async function login(email, password) {
    const result = await loginApi({ email, password })

    if (!result.success) {
      return result
    }

    token.value = result.data.token || ''
    user.value = result.data.user || null

    persistAuthState()

    return result
  }

  function logout() {
    token.value = ''
    user.value = null
    persistAuthState()
  }

  function readStoredUser() {
    const rawUser = localStorage.getItem(USER_STORAGE_KEY)

    if (!rawUser) {
      return null
    }

    try {
      return JSON.parse(rawUser)
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY)
      return null
    }
  }

  function persistAuthState() {
    if (token.value) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token.value)
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    }

    if (user.value) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user.value))
    } else {
      localStorage.removeItem(USER_STORAGE_KEY)
    }
  }

  return {
    token,
    user,
    isLoggedIn,
    login,
    register,
    logout,
  }
})
