<script>
import { ref } from 'vue'
import api from '../services/api.js'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'FeedbackModal',
  emits: ['close', 'submitted', 'require-login'],
  setup(_, { emit }) {
    const auth = useAuthStore()
    const message = ref('')
    const rating = ref(0)
    const isSubmitting = ref(false)
    const error = ref(null)

    // ✅ DEBUG METHOD - Add this for testing
    async function debugAuth() {
      console.log('🧪 DEBUG: Checking authentication status')
      
      const token = localStorage.getItem('auth_token')
      const user = localStorage.getItem('user')
      const refreshToken = localStorage.getItem('refresh_token')
      
      console.log('🧪 DEBUG: Local Storage Check', {
        hasToken: !!token,
        tokenLength: token?.length,
        hasUser: !!user,
        hasRefresh: !!refreshToken,
        authStore: auth?.isLoggedIn,
        tokenPreview: token ? token.substring(0, 30) + '...' : null
      })

      // Test API call
      try {
        const testResult = await api.testAuth()
        console.log('🧪 DEBUG: API Test Result', testResult)
      } catch (err) {
        console.log('🧪 DEBUG: API Test Failed', err.message)
      }
    }

    async function submitFeedback() {
      error.value = null
      
      if (!message.value.trim()) {
        error.value = 'Please type your feedback.'
        return
      }
      
      if (rating.value === 0) {
        error.value = 'Please select a rating.'
        return
      }

      // Enhanced authentication check
      const token = localStorage.getItem('auth_token')
      const loggedIn = auth?.isLoggedIn || !!token

      console.log('Debug - Auth check:', {
        authStore: auth?.isLoggedIn,
        token: !!token,
        loggedIn: loggedIn
      })

      if (!loggedIn) {
        console.log('Not logged in, requiring login')
        emit('require-login')
        return
      }

      isSubmitting.value = true

      try {
        const payload = {
          service_name: 'General',
          rating: rating.value,
          comment: message.value,
        }

        console.log('Submitting feedback:', payload)
        
        // Use the sendFeedback method which calls the correct endpoint
        await api.sendFeedback(payload)
        
        message.value = ''
        rating.value = 0
        emit('submitted')
        emit('close')
        
      } catch (err) {
        console.error('Feedback submission error details:', err)
        
        // Enhanced error handling for auth issues
        if (err.message.includes('401') || 
            err.message.includes('Unauthorized') || 
            err.message.includes('log in')) {
          error.value = 'Please log in again to submit feedback.'
          // Clear potentially invalid token
          localStorage.removeItem('auth_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('user')
          emit('require-login')
          return
        }

        if (typeof err === 'string') {
          error.value = err
        } else if (err?.error) {
          error.value = err.error
        } else if (err?.detail) {
          error.value = err.detail
        } else if (err?.message) {
          error.value = err.message
        } else {
          error.value = 'Failed to send feedback. Please try again.'
        }
      } finally {
        isSubmitting.value = false
      }
    }

    return { 
      message, 
      rating, 
      submitFeedback, 
      isSubmitting, 
      error,
      debugAuth  // Export the debug function
    }
  },
}
</script>


<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div class="w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl">
      <!-- Title -->
      <h3 class="mb-3 text-lg font-bold text-gray-900">Send Feedback</h3>

      <!-- ⭐ Rating -->
      <div class="flex justify-center gap-2 mb-4">
        <svg
          v-for="star in 5"
          :key="star"
          @click="rating = star"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-8 h-8 transition cursor-pointer"
          :class="rating >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'"
        >
          <path
            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.868 1.48 8.326L12 18.896l-7.416 4.604 1.48-8.326L0 9.306l8.332-1.151z"
          />
        </svg>
      </div>

      <!-- Textarea -->
      <textarea
        v-model="message"
        placeholder="Type your feedback..."
        class="w-full h-32 p-3 text-gray-900 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      ></textarea>

      <!-- Error -->
      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>

      <!-- Buttons -->
      <div class="flex items-center justify-end gap-3 mt-4">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="submitFeedback"
          :disabled="isSubmitting"
          class="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {{ isSubmitting ? 'Sending...' : 'Submit' }}
        </button>
      </div>
    </div>
  </div>
</template>