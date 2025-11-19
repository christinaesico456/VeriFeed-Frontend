import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://verifeed-backend-production.up.railway.app/api"
// ========================
// Axios instances
// ========================
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
})

const publicApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

// ========================
// Refresh token helper
// ========================
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token")
  if (!refreshToken) {
    console.warn("No refresh token available")
    return null
  }

  try {
    console.log("🔄 Attempting token refresh...")
    const response = await axios.post(`${API_BASE_URL}/accounts/token/refresh/`, {
      refresh: refreshToken,
    })
    const newAccess = response.data.access
    if (newAccess) {
      localStorage.setItem("auth_token", newAccess)
      console.log("✅ Token refreshed successfully")
      return newAccess
    }
  } catch (err) {
    console.error("🔴 Token refresh failed:", err.response?.data || err.message)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
  }
  return null
}

// ========================
// Interceptors
// ========================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const newAccess = await refreshAccessToken()
      if (newAccess) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`
        return api(originalRequest)
      }
    }
    return Promise.reject(error)
  }
)

// ========================
// Error handler
// ========================
function handleError(error, fallbackMsg) {
  console.error("🔴 API Error:", error)
  const res = error.response?.data
  let message = fallbackMsg

  if (res?.detail) message = res.detail
  else if (res?.error) message = res.error
  else if (res?.message) message = res.message
  else if (res?.non_field_errors) message = res.non_field_errors[0]
  else if (error.message) message = error.message

  throw new Error(message)
}

// ========================
// EXPORT MAIN API
// ========================
export { api, publicApi }

export default {
  // ========================
  // AUTH / PROFILE
  // ========================
  
  async registerUser(data) {
    try {
      const formData = data instanceof FormData ? data : new FormData()
      if (!(data instanceof FormData)) {
        Object.entries(data).forEach(([k, v]) => {
          if (v !== undefined && v !== null) formData.append(k, v)
        })
      }
      const response = await publicApi.post("/accounts/register/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data
    } catch (error) {
      handleError(error, "Registration failed")
    }
  },

  async logoutUser() {
    try {
      await api.post("/accounts/logout/").catch(() => {})
    } finally {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user")
    }
  },

  async getProfile() {
    try {
      const response = await api.get("/accounts/profile/")
      return response.data
    } catch (error) {
      handleError(error, "Failed to fetch profile")
    }
  },

  async updateProfile(data) {
    try {
      const formData = data instanceof FormData ? data : new FormData()
      if (!(data instanceof FormData)) {
        Object.entries(data).forEach(([k, v]) => {
          if (v !== undefined && v !== null) formData.append(k, v)
        })
      }
      const response = await api.put("/accounts/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data
    } catch (error) {
      handleError(error, "Failed to update profile")
    }
  },

  async uploadProfilePicture(formData) {
    try {
      const response = await api.post("/accounts/upload-profile-picture/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      
      // Add cache-busting timestamp to the URL
      const data = response.data
      if (data.profile_picture_url) {
        data.profile_picture_url = `${data.profile_picture_url}?v=${Date.now()}`
      }
      if (data.user && data.user.profile_picture) {
        data.user.profile_picture = `${data.user.profile_picture}?v=${Date.now()}`
      }
      
      return data
    } catch (error) {
      handleError(error, "Failed to upload profile picture")
    }
  },

  async removeProfilePicture() {
    try {
      const response = await api.delete("/accounts/remove-profile-picture/")
      
      // Add cache-busting timestamp to the URL
      const data = response.data
      if (data.profile_picture_url) {
        data.profile_picture_url = `${data.profile_picture_url}?v=${Date.now()}`
      }
      if (data.user && data.user.profile_picture) {
        data.user.profile_picture = `${data.user.profile_picture}?v=${Date.now()}`
      }
      
      return data
    } catch (error) {
      handleError(error, "Failed to remove profile picture")
    }
  },

  // ========================
  // 2FA OTP METHODS
  // ========================
  
  async requestOTP(credentials, purpose = "login") {
    try {
      console.log("🔐 Requesting OTP...", { username: credentials.usernameOrEmail, purpose })
      const payload = {
        username_or_email: credentials.usernameOrEmail || credentials.email || credentials.username,
        password: credentials.password,
        purpose: purpose,
      }
      const response = await publicApi.post("/accounts/request-otp/", payload)
      console.log("✅ OTP requested successfully:", response.data)
      return response.data
    } catch (error) {
      console.error("🔴 OTP request error:", error.response?.data || error.message)
      handleError(error, "Failed to send OTP")
    }
  },

  async verifyOTP(credentials, otpCode, purpose = "login") {
    try {
      console.log("🔐 Verifying OTP...", { username: credentials.usernameOrEmail })
      const payload = {
        username_or_email: credentials.usernameOrEmail || credentials.email || credentials.username,
        otp_code: otpCode,
        purpose: purpose,
      }
      const response = await publicApi.post("/accounts/verify-otp/", payload)
      console.log("✅ OTP verified successfully:", response.data)
      const data = response.data

      if (data.access) {
        localStorage.setItem("auth_token", data.access)
        if (data.refresh) localStorage.setItem("refresh_token", data.refresh)
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      return data
    } catch (error) {
      console.error("🔴 OTP verification error:", error.response?.data || error.message)
      handleError(error, "Failed to verify OTP")
    }
  },

  async resendOTP(credentials, purpose = "login") {
    try {
      console.log("🔐 Resending OTP...")
      const payload = {
        username_or_email: credentials.usernameOrEmail || credentials.email || credentials.username,
        purpose: purpose,
      }
      const response = await publicApi.post("/accounts/resend-otp/", payload)
      console.log("✅ OTP resent successfully:", response.data)
      return response.data
    } catch (error) {
      console.error("🔴 OTP resend error:", error.response?.data || error.message)
      handleError(error, "Failed to resend OTP")
    }
  },

  async toggle2FA(enable = true) {
    try {
      console.log(`🔐 ${enable ? "Enabling" : "Disabling"} 2FA...`)
      const response = await api.post("/accounts/toggle-2fa/", { enable })
      console.log("✅ 2FA toggled successfully:", response.data)
      return response.data
    } catch (error) {
      console.error("🔴 2FA toggle error:", error.response?.data || error.message)
      handleError(error, "Failed to toggle 2FA")
    }
  },

  async loginUser(credentials) {
    try {
      console.log("🔐 Login attempt (will require OTP)...")
      const otpResponse = await this.requestOTP(credentials, "login")
      return {
        requires_otp: true,
        ...otpResponse,
      }
    } catch (error) {
      console.error("🔴 Login error:", error.response?.data || error.message)
      handleError(error, "Login failed")
    }
  },

  // ========================
  // FEEDBACK
  // ========================
  
  async sendFeedback(payload) {
    try {
      const response = await api.post("/quick-review/", payload)
      return response.data
    } catch (error) {
      handleError(error, "Failed to send feedback")
    }
  },

  async getFeedbacks(serviceName = "General") {
    try {
      console.log('🔍 Fetching feedbacks for:', serviceName)
      const response = await publicApi.get(`/service_review_summary/${serviceName}/`)
      console.log('✅ Feedbacks loaded:', response.data)
      return response.data
    } catch (error) {
      console.error('🔴 Failed to load feedbacks:', error.response?.data || error.message)
      handleError(error, "Failed to load feedbacks")
    }
  },

  // ========================
  // VIDEO / TEST
  // ========================
  
  async uploadVideo(videoFile, progressCallback) {
    try {
      const formData = new FormData()
      formData.append("video", videoFile)
      const response = await api.post("/videos/analyze/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: progressCallback,
      })
      return response.data
    } catch (error) {
      handleError(error, "Upload failed")
    }
  },

  async getAnalysisResult(id) {
    try {
      const response = await api.get(`/videos/analysis/${id}/`)
      return response.data
    } catch (error) {
      handleError(error, "Failed to get analysis")
    }
  },

  async testAuth() {
    try {
      const response = await api.get("/test-endpoint/")
      return response.data
    } catch (error) {
      return { error: error.message, authenticated: false }
    }
  },
}