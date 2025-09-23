import axios from 'axios'

const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor for auth tokens
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

export default {
  // Video analysis
  async uploadVideo(videoFile, progressCallback) {
    const formData = new FormData()
    formData.append('video', videoFile)
    
    try {
      const response = await api.post('/videos/analyze/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressCallback
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Upload failed')
    }
  },

  async getAnalysisResult(analysisId) {
    try {
      const response = await api.get(`/videos/analysis/${analysisId}/`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get analysis')
    }
  },

  // Contact & Feedback
  async sendMessage(messageData) {
    try {
      const response = await api.post('/contact/', messageData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message')
    }
  },

  async sendFeedback(feedbackData) {
    try {
      const response = await api.post('/feedback/', feedbackData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send feedback')
    }
  },

  // User management
  async registerUser(userData) {
    try {
      const response = await api.post('/auth/register/', userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  },

  async loginUser(credentials) {
    try {
      const response = await api.post('/auth/login/', credentials)
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
      }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }
}