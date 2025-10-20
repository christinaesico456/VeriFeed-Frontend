<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div class="w-full max-w-lg p-6 bg-white rounded-2xl">
      <h3 class="mb-4 text-lg font-bold text-center">Create account</h3>

      <!-- ADDED: Profile picture upload section -->
      <div class="flex flex-col items-center mb-4">
        <div class="relative flex items-center justify-center overflow-hidden border-2 border-gray-300 border-dashed rounded-full w-28 h-28">
          <img
            v-if="previewImage"
            :src="previewImage"
            alt="Profile Preview"
            class="object-cover w-full h-full rounded-full"
          />
          <div v-else class="text-sm leading-tight text-center text-gray-400">
            <span class="block mb-1 text-3xl">+</span>
            <span>Add Photo</span>
          </div>
          <input
            id="profilePictureInput"
            type="file"
            accept="image/*"
            class="absolute inset-0 opacity-0 cursor-pointer"
            @change="onFileChange"
          />
        </div>
        <p class="mt-2 text-xs text-gray-500">JPEG, PNG, GIF, or WebP. Max 5MB.</p>
      </div>

      <div class="grid grid-cols-1 gap-3">
        <input v-model="username" placeholder="Username" class="w-full px-3 py-2 border rounded" />
        <input v-model="fullName" placeholder="Full name (First Last)" class="w-full px-3 py-2 border rounded" />
        <input v-model="email" type="email" placeholder="Email" class="w-full px-3 py-2 border rounded" />

        <!-- ADDED: birthday field (visible input for user) -->
        <div class="relative">
          <input
            v-model="birthday"
            type="date"
            placeholder="dd/mm/yyyy"
            class="w-full px-3 py-2 text-gray-700 border rounded"
          />
          <span class="absolute text-gray-400 pointer-events-none right-3 top-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10m-12 4h14a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
        </div>

        <input v-model="password" type="password" placeholder="Password" class="w-full px-3 py-2 border rounded" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm password" class="w-full px-3 py-2 border rounded" />

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      </div>

      <div class="flex items-center justify-end gap-3 mt-4">
        <button @click="$emit('close')" class="px-4 py-2 text-gray-700 bg-gray-200 rounded">Cancel</button>
        <button @click="submit" :disabled="isLoading" class="px-4 py-2 text-white bg-green-600 rounded">
          {{ isLoading ? 'Creating...' : 'Sign up' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'SignupModal',
  emits: ['close', 'signed-up'],
  setup(_, { emit }) {
    const auth = useAuthStore()
    const username = ref('')
    const fullName = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const profilePicture = ref(null)
    const previewImage = ref(null)
    const isLoading = ref(false)
    const error = ref(null)
    const birthday = ref('') // ADDED: birthday field (backend + visible input)

    function onFileChange(e) {
      const file = e.target.files[0] || null
      profilePicture.value = file
      if (file) {
        previewImage.value = URL.createObjectURL(file)
      }
    }

    async function submit() {
      error.value = null
      if (!username.value || !fullName.value || !email.value || !password.value || !confirmPassword.value) {
        error.value = 'Please fill all required fields.'
        return
      }
      if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match.'
        return
      }

      const formData = new FormData()
      formData.append('username', username.value)
      formData.append('full_name', fullName.value)
      formData.append('email', email.value)
      formData.append('password', password.value)
      formData.append('confirm_password', confirmPassword.value)
      formData.append('birthday', birthday.value) // ADDED: birthday field (backend)
      if (profilePicture.value) {
        formData.append('profile_picture', profilePicture.value)
      }

      isLoading.value = true
      const res = await auth.register(formData)
      isLoading.value = false

      if (res.success) {
        emit('signed-up')
        emit('close')
      } else {
        error.value = res.error?.error || JSON.stringify(res.error) || 'Signup failed'
      }
    }

    return {
      username,
      fullName,
      email,
      password,
      confirmPassword,
      profilePicture,
      previewImage,
      onFileChange,
      submit,
      isLoading,
      error,
      birthday // ADDED: birthday field (backend + visible input)
    }
  }
}
</script>
