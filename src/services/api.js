import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"

// ========================
// Axios instances
// ========================
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
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
        console.warn('No refresh token available')
        return null
    }

    try {
        console.log('🔄 Attempting token refresh...')
        const response = await axios.post(`${API_BASE_URL}/accounts/token/refresh/`, {
            refresh: refreshToken,
        })
        
        const newAccess = response.data.access
        if (newAccess) {
            localStorage.setItem("auth_token", newAccess)
            console.log('✅ Token refreshed successfully')
            return newAccess
        }
    } catch (err) {
        console.error('🔴 Token refresh failed:', err.response?.data || err.message)
        // Clear invalid tokens
        localStorage.removeItem("auth_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user")
    }
    return null
}

// ========================
// Request interceptor (adds token)
// ========================
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token")
    
    console.log('🔍 API Request Debug:', {
        url: `${config.baseURL}${config.url}`,
        method: config.method.toUpperCase(),
        hasToken: !!token,
        tokenPreview: token ? `${token.substring(0, 20)}...` : 'No token',
        data: config.data
    })

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        console.warn('⚠️ No auth token found - request may fail if authentication required')
    }
    
    return config
}, (error) => {
    console.error('🔴 Request interceptor error:', error)
    return Promise.reject(error)
})

// ========================
// Response interceptor (auto-refresh on 401)
// ========================
api.interceptors.response.use(
    (response) => {
        console.log('✅ API Response:', response.status, response.config.url)
        return response
    },
    async (error) => {
        console.error('🔴 API Response Error:', {
            status: error.response?.status,
            url: error.config?.url,
            data: error.response?.data,
            message: error.message
        })

        const originalRequest = error.config
        
        // Only attempt refresh on 401 errors and if we haven't already tried
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log('🔄 401 error detected, attempting token refresh...')
            originalRequest._retry = true
            
            const newAccess = await refreshAccessToken()
            if (newAccess) {
                console.log('✅ Retrying original request with new token')
                originalRequest.headers["Authorization"] = `Bearer ${newAccess}`
                return api(originalRequest)
            } else {
                console.log('🔴 Token refresh failed, redirecting to login')
                // Could emit an event here to force logout in the UI
            }
        }
        
        return Promise.reject(error)
    }
)

// ========================
// Centralized error handler
// ========================
function handleError(error, fallbackMsg) {
    console.error('🔴 API Error Handler:', error)
    
    if (!error) throw new Error(fallbackMsg)
    
    const res = error.response?.data
    let message = fallbackMsg
    
    if (res?.detail) message = res.detail
    else if (res?.error) message = res.error  
    else if (res?.message) message = res.message
    else if (error.message) message = error.message
    
    // Handle validation errors
    if (res && typeof res === 'object') {
        if (res.non_field_errors) message = res.non_field_errors[0]
        else if (res.details && typeof res.details === 'object') {
            const firstError = Object.values(res.details)[0]
            if (Array.isArray(firstError)) message = firstError[0]
            else if (typeof firstError === 'string') message = firstError
        }
    }
    
    throw new Error(message)
}

// ========================
// API METHODS
// ========================
export { api, publicApi }

export default {
    // ========================
    // PROFILE PICTURE METHODS - NEW
    // ========================
    async uploadProfilePicture(formData) {
        try {
            console.log('📸 Uploading profile picture...')
            
            const response = await api.post("/accounts/upload-profile-picture/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            
            console.log('✅ Profile picture uploaded:', response.data)
            return response.data
            
        } catch (error) {
            console.error('🔴 Profile picture upload error:', error)
            handleError(error, "Failed to upload profile picture")
        }
    },

    async removeProfilePicture() {
        try {
            console.log('🗑️ Removing profile picture...')
            
            const response = await api.delete("/accounts/remove-profile-picture/")
            
            console.log('✅ Profile picture removed:', response.data)
            return response.data
            
        } catch (error) {
            console.error('🔴 Profile picture removal error:', error)
            handleError(error, "Failed to remove profile picture")
        }
    },

    async updateProfile(data) {
        try {
            console.log('👤 Updating profile...')
            
            let formData
            if (data instanceof FormData) {
                formData = data
            } else {
                formData = new FormData()
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        formData.append(key, value)
                    }
                })
            }

            const response = await api.put("/accounts/profile/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            
            console.log('✅ Profile updated:', response.data)
            return response.data
            
        } catch (error) {
            console.error('🔴 Profile update error:', error)
            handleError(error, "Failed to update profile")
        }
    },

    // ========================
    // FEEDBACK & REVIEWS - FIXED
    // ========================
    async sendFeedback(data) {
        try {
            console.log('📝 Sending feedback:', data)
            
            // Ensure we have required data
            const payload = {
                service_name: data.service_name || "General",
                rating: parseInt(data.rating) || 5,
                comment: data.comment || data.message || "",
                title: data.title || ""
            }
            
            console.log('📝 Final payload:', payload)
            
            // ✅ Use the correct endpoint that matches your Django URLs
            const response = await api.post("/quick-review/", payload)
            
            console.log('✅ Feedback sent successfully:', response.data)
            return response.data
            
        } catch (error) {
            console.error('🔴 Feedback send error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            })
            
            // Provide specific error messages for common issues
            if (error.response?.status === 401) {
                throw new Error('Please log in to submit feedback')
            } else if (error.response?.status === 400) {
                const errorData = error.response.data
                if (errorData.details) {
                    const errors = Object.values(errorData.details).flat()
                    throw new Error(errors.join(', '))
                }
            }
            
            handleError(error, "Failed to send feedback")
        }
    },

    async getFeedbacks(serviceName = "General") {
        try {
            console.log('📖 Loading feedbacks for service:', serviceName)
            
            // Use the public endpoint that returns review data
            const response = await publicApi.get(
                `/service_review_summary/${encodeURIComponent(serviceName)}/`
            )
            
            console.log('✅ Feedbacks loaded:', response.data)
            return response.data
            
        } catch (error) {
            console.error('🔴 Failed to load feedbacks:', error)
            handleError(error, "Failed to load feedbacks")
        }
    },

    // ========================
    // AUTH - ENHANCED
    // ========================
    async registerUser(data) {
        try {
            console.log('🔐 Registering user...')
            
            let formData
            if (data instanceof FormData) {
                formData = data
            } else {
                formData = new FormData()
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        formData.append(key, value)
                    }
                })
            }

            const response = await publicApi.post("/accounts/register/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            
            const resp = response.data
            console.log('✅ Registration response:', resp)
            
            // Store tokens
            if (resp.access) {
                localStorage.setItem("auth_token", resp.access)
                if (resp.refresh) localStorage.setItem("refresh_token", resp.refresh)
            }
            
            // Store user data
            if (resp.user) {
                localStorage.setItem("user", JSON.stringify(resp.user))
            }
            
            return resp
            
        } catch (error) {
            console.error('🔴 Registration error:', error.response?.data || error.message)
            handleError(error, "Registration failed")
        }
    },

    async loginUser(credentials) {
        try {
            console.log('🔐 Logging in user...')
            
            const payload = {
                username: credentials.usernameOrEmail || credentials.email || credentials.username,
                password: credentials.password,
            }
            
            console.log('🔐 Login payload:', { username: payload.username, password: '***' })

            const response = await publicApi.post("/accounts/token/", payload)
            const data = response.data
            
            console.log('✅ Login response:', { 
                hasAccess: !!data.access, 
                hasRefresh: !!data.refresh,
                hasUser: !!data.user
            })

            // Store tokens
            if (data.access) {
                localStorage.setItem("auth_token", data.access)
                if (data.refresh) localStorage.setItem("refresh_token", data.refresh)
            }

            // Store or fetch user data
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user))
            } else {
                // Try to fetch user profile
                try {
                    const profileRes = await this.getProfile()
                    localStorage.setItem("user", JSON.stringify(profileRes))
                } catch (profileError) {
                    console.warn('Could not fetch user profile:', profileError)
                }
            }

            return data
            
        } catch (error) {
            console.error('🔴 Login error:', error.response?.data || error.message)
            handleError(error, "Login failed")
        }
    },

    async logoutUser() {
        try {
            console.log('🔐 Logging out...')
            
            // Try to call backend logout (optional)
            try {
                await api.post("/accounts/logout/")
            } catch (e) {
                console.warn('Backend logout call failed (non-critical):', e.message)
            }
            
        } finally {
            // Always clear local storage
            localStorage.removeItem("auth_token")
            localStorage.removeItem("refresh_token")  
            localStorage.removeItem("user")
            console.log('✅ Local logout completed')
        }
    },

    async getProfile() {
        try {
            console.log('👤 Fetching user profile...')
            const response = await api.get("/accounts/profile/")
            console.log('✅ Profile loaded:', response.data)
            return response.data
        } catch (error) {
            console.error('🔴 Profile fetch error:', error)
            handleError(error, "Failed to fetch profile")
        }
    },

    // ========================
    // VIDEO (if needed)
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

    // ========================
    // TEST METHOD - for debugging
    // ========================
    async testAuth() {
        try {
            console.log('🧪 Testing authentication...')
            const response = await api.get('/test-endpoint/')
            console.log('✅ Auth test result:', response.data)
            return response.data
        } catch (error) {
            console.error('🔴 Auth test failed:', error)
            return { error: error.message, authenticated: false }
        }
    }
}