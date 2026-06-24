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
        message: data.message || 'Request failed',
        data,
      }
    }

    return {
      success: true,
      message: data.message || 'Request successful',
      data,
    }
  } catch {
    return {
      success: false,
      message: 'Unable to connect to server',
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
