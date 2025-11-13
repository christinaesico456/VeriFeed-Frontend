import { defineStore } from 'pinia'
import api from '../services/api.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('auth_token') || null,
    isLoading: false,
    error: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    username: (state) => state.user?.username || ''
  },
  actions: {
    init() {
      // kept for completeness; api.js reads localStorage for header
      const t = localStorage.getItem('auth_token')
      const u = JSON.parse(localStorage.getItem('user') || 'null')
      this.token = t
      this.user = u
    },

    async login({ usernameOrEmail, password }) {
      this.isLoading = true
      this.error = null
      try {
        const data = await api.loginUser({ usernameOrEmail, password })
        // backend already returned token + user and api saved them to localStorage
        this.token = localStorage.getItem('auth_token')
        this.user = JSON.parse(localStorage.getItem('user') || 'null')
        this.isLoading = false
        return { success: true, data }
      } catch (err) {
        this.isLoading = false
        this.error = err.error || err.detail || err
        return { success: false, error: this.error }
      }
    },

    async register(formData) {
      this.isLoading = true
      this.error = null
      try {
        const data = await api.registerUser(formData)
        this.token = localStorage.getItem('auth_token')
        this.user = JSON.parse(localStorage.getItem('user') || 'null')
        this.isLoading = false
        return { success: true, data }
      } catch (err) {
        this.isLoading = false
        this.error = err.error || err.detail || err
        return { success: false, error: this.error }
      }
    },

    async logout() {
      this.isLoading = true
      try {
        await api.logout()
      } catch (_) {
        // ignore backend error but clear local state anyway
      } finally {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
        this.token = null
        this.user = null
        this.isLoading = false
      }
    },

    async fetchProfile() {
      try {
        const data = await api.getProfile()
        this.user = data
        localStorage.setItem('user', JSON.stringify(data))
        return data
      } catch (err) {
        throw err
      }
    }
  }
})

