<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'LoginModal',
  emits: ['close', 'logged-in', 'open-signup'],
  setup(_, { emit }) {
    const auth = useAuthStore()
    const usernameOrEmail = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const error = ref(null)

    async function submit() {
      error.value = null
      if (!usernameOrEmail.value || !password.value) {
        error.value = 'Please enter username/email and password.'
        return
      }
      isLoading.value = true
      const res = await auth.login({
        usernameOrEmail: usernameOrEmail.value,
        password: password.value
      })
      isLoading.value = false
      if (res.success) {
        emit('logged-in') // let parent know to close or refresh UI
        emit('close')
      } else {
        error.value =
          res.error?.error || JSON.stringify(res.error) || 'Login failed'
      }
    }

    function openSignup() {
      emit('open-signup')
      emit('close') // close login modal so parent can open signup
    }

    return {
      usernameOrEmail,
      password,
      submit,
      isLoading,
      error,
      openSignup
    }
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div class="w-full max-w-md p-6 bg-white rounded-2xl">
      <h3 class="mb-4 text-lg font-bold">Log in</h3>

      <div class="space-y-3">
        <!-- Username/Email -->
        <input
          v-model="usernameOrEmail"
          type="text"
          placeholder="Username or email"
          class="w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <!-- Password -->
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <!-- Error -->
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-end gap-3 mt-4">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="submit"
          :disabled="isLoading"
          class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {{ isLoading ? 'Logging in...' : 'Log in' }}
        </button>
      </div>

      <!-- Switch to Signup -->
      <p class="mt-4 text-sm text-gray-600">
        Don't have an account yet?
        <button @click="openSignup" class="font-semibold text-blue-600 hover:underline">
          Sign up
        </button>
      </p>
    </div>
  </div>
</template>
