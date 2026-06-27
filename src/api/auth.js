const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function request(path, payload) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      return {
        success: false,
        message: data.message || '請求失敗，請稍後再試',
        data,
      }
    }

    return {
      success: true,
      message: data.message || '請求成功',
      data,
    }
  } catch {
    return {
      success: false,
      message: '無法連線到伺服器，請稍後再試',
      data: null,
    }
  }
}

export function register(payload) {
  return request('/api/auth/register', payload)
}

export function login(payload) {
  return request('/api/auth/login', payload)
}
