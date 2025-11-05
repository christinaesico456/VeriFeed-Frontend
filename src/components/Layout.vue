<script setup>
import { ref, onMounted } from "vue"
import api from "../services/api.js"
import FeedbackModal from "./FeedbackModal.vue"
import Contacts from "./Contacts.vue"
import Footer from "./Footer.vue"
import { useAuthStore } from "../stores/auth.js"

const auth = useAuthStore()
const showProfile = ref(false)
const isLoggedIn = ref(false)
const errorMessage = ref("")
const userData = ref({ username: "", email: "", profile_picture: null })
const isScrolled = ref(false)
const showAbout = ref(false)
const authTab = ref("login")

// Feedback states
const showFeedback = ref(false)
const isBackendConnected = ref(false)

// Profile picture upload states
const profilePictureInput = ref(null)
const isUploadingPicture = ref(false)

const loginForm = ref({ email: "", password: "" })
const signupForm = ref({
  full_name: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  profile_picture: null,
  birthday: "",
})

const signupPreviewImage = ref(null) // preview for profile picture

function onSignupProfilePictureChange(e) {
  const file = e.target.files[0] || null
  signupForm.value.profile_picture = file
  if (file) {
    signupPreviewImage.value = URL.createObjectURL(file)
  }
}

function forceProfileDropdown() {
  showProfile.value = true
}

function openFeedbackModal() {
  if (!isLoggedIn.value) {
    forceProfileDropdown()
    return
  }
  showFeedback.value = true
}

const emit = defineEmits(["feedback-submitted"])

function handleFeedbackSubmitted() {
  console.log("✅ Feedback submitted successfully.")
  emit("feedback-submitted")
}

function toggleAbout() {
  showAbout.value = !showAbout.value
}

function closeAbout() {
  showAbout.value = false
}

function toggleProfile() {
  showProfile.value = !showProfile.value
}

/* ---------------- PROFILE PICTURE HANDLERS ---------------- */
function triggerProfilePictureUpload() {
  if (profilePictureInput.value) {
    profilePictureInput.value.click()
  }
}

async function handleProfilePictureUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  isUploadingPicture.value = true
  errorMessage.value = ""

  try {
    const formData = new FormData()
    formData.append("profile_picture", file)

    // Call the correct API method
    const response = await api.uploadProfilePicture(formData)

    // Update local state
    userData.value.profile_picture = response.profile_picture_url || response.profile_picture
    localStorage.setItem("user", JSON.stringify(userData.value))
  } catch (err) {
    errorMessage.value = "Failed to upload picture"
    console.error(err)
  } finally {
    isUploadingPicture.value = false
  }
}

async function removeProfilePicture() {
  isUploadingPicture.value = true
  errorMessage.value = ""

  try {
    await api.removeProfilePicture()
    userData.value.profile_picture = null
    localStorage.setItem("user", JSON.stringify(userData.value))
  } catch (err) {
    errorMessage.value = "Failed to remove picture"
    console.error(err)
  } finally {
    isUploadingPicture.value = false
  }
}

async function fetchAndSetProfile() {
  try {
    const profile = await api.getProfile()
    userData.value = {
      username: profile.username,
      email: profile.email,
      profile_picture: profile.profile_picture_url || profile.profile_picture,
      birthday: profile.birthday || null,
    }
    localStorage.setItem("user", JSON.stringify(userData.value))
  } catch (e) {
    console.error("Failed to fetch profile", e)
  }
}

async function login() {
  errorMessage.value = ""
  try {
    await api.loginUser(loginForm.value)
    await fetchAndSetProfile()
    isLoggedIn.value = true
    showProfile.value = false
    isBackendConnected.value = true
  } catch (err) {
    errorMessage.value = err.message || String(err)
  }
}

async function signup() {
  errorMessage.value = ""
  try {
    await api.registerUser(signupForm.value)
    await fetchAndSetProfile()
    isLoggedIn.value = true
    showProfile.value = false
    isBackendConnected.value = true
  } catch (err) {
    errorMessage.value = err.message || String(err)
  }
}

function logout() {
  api.logoutUser()
  isLoggedIn.value = false
  userData.value = { username: "", email: "", profile_picture: null }
  isBackendConnected.value = false
}

onMounted(() => {
  document.addEventListener("click", (e) => {
    const navbar = document.querySelector("#navbar")
    if (navbar && !navbar.contains(e.target)) {
      showAbout.value = false
    }
  })
})

onMounted(() => {
  const heroSection = document.querySelector("#home")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isScrolled.value = !entry.isIntersecting
      })
    },
    { threshold: 0.3 }
  )
  if (heroSection) observer.observe(heroSection)
})

onMounted(() => {
  const storedToken = localStorage.getItem("auth_token")
  const storedUser = localStorage.getItem("user")
  if (storedToken) {
    isLoggedIn.value = true
    userData.value = storedUser
      ? JSON.parse(storedUser)
      : { username: "", email: "", profile_picture: null }
  }
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Navigation -->
    <nav
      id="navbar"
      class="fixed top-0 left-0 z-30 w-full transition-all duration-500 ease-in-out"
      :class="isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'"
    >
      <div class="flex items-center justify-between px-8 mx-auto max-w-7xl">
        <!-- Logo -->
        <div class="flex items-center">
          <img
            src="/verifeed_logo.png"
            alt="VeriFeed Logo"
            class="object-contain w-12 h-12 transition-transform duration-300 hover:scale-105"
            :class="isScrolled ? 'opacity-100' : 'opacity-90'"
          />
        </div>

        <!-- Nav links -->
        <div class="items-center hidden space-x-10 md:flex">
          <a
            href="#home"
            class="text-sm font-medium tracking-wide uppercase transition-colors"
            :class="isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-400'"
          >
            Home
          </a>

          <!-- About dropdown -->
          <div class="relative">
            <button
              @click="toggleAbout"
              class="flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors"
              :class="isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-400'"
            >
              About
              <svg class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown content -->
            <div
              class="absolute left-0 w-56 py-2 mt-2 rounded-xl backdrop-blur-lg"
              :class="[
                isScrolled ? 'bg-white shadow-lg border border-gray-200' : 'bg-blue-900/90 border border-blue-500/30',
                showAbout ? '' : 'hidden'
              ]"
            >
              <a
                href="#about"
                class="block px-4 py-2 text-sm transition-colors rounded-lg"
                :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'"
              >Overview</a>
              <a
                href="#features"
                class="block px-4 py-2 text-sm transition-colors rounded-lg"
                :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'"
              >Features</a>
              <a
                href="#how"
                class="block px-4 py-2 text-sm transition-colors rounded-lg"
                :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'"
              >How it Works</a>
              <a
                href="#sneakpeek"
                class="block px-4 py-2 text-sm transition-colors rounded-lg"
                :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'"
              >Video Sneak Peek</a>
              <a
                href="#faq"
                class="block px-4 py-2 text-sm transition-colors rounded-lg"
                :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'"
              >FAQ</a>
            </div>
          </div>

          <a
            href="#install"
            class="text-sm font-medium tracking-wide uppercase transition-colors"
            :class="isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-400'"
          >
            Install
          </a>
          <a
            href="#contacts"
            class="text-sm font-medium tracking-wide uppercase transition-colors"
            :class="isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-400'"
          >
            Contacts
          </a>

          <!-- Enhanced Profile Button -->
          <div class="relative">
            <button
              @click="toggleProfile"
              class="relative w-10 h-10 overflow-hidden transition-transform border-2 rounded-full hover:scale-105"
              :class="isScrolled ? 'border-gray-800' : 'border-white'"
            >
              <img
                :src="userData.profile_picture || '/profile_pics/default.jpg'"
                :alt="userData.username || 'Profile'"
                class="object-cover w-full h-full"
                @error="$event.target.src = '/profile_placeholder.png'"
              />
              <div
                v-if="isLoggedIn"
                class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"
              ></div>
            </button>

            <!-- Profile Dropdown -->
            <div v-if="showProfile" class="absolute right-0 z-30 p-6 mt-2 bg-white shadow-xl w-80 rounded-2xl">
              <div v-if="isLoggedIn">
                <!-- Logged in -->
                <div class="flex items-center mb-4">
                  <div class="relative">
                    <img
                      :src="userData.profile_picture || '/profile_placeholder.png'"
                      :alt="userData.username"
                      class="object-cover w-16 h-16 mr-4 border-2 border-gray-200 rounded-full"
                      @error="$event.target.src = '/profile_placeholder.png'"
                    />
                    <button
                      @click="triggerProfilePictureUpload"
                      :disabled="isUploadingPicture"
                      class="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100"
                      title="Change profile picture"
                    >
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 12l2 2 4-4"
                        />
                      </svg>
                    </button>

                    <div
                      v-if="isUploadingPicture"
                      class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
                    >
                      <div class="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    </div>
                  </div>

                  <div class="flex-1">
                    <p class="font-semibold text-gray-800">{{ userData.username }}</p>
                    <p class="text-sm text-gray-500">{{ userData.email }}</p>
                    <p
                      v-if="userData.first_name || userData.last_name"
                      class="text-sm text-gray-600"
                    >
                      {{ userData.first_name }} {{ userData.last_name }}
                    </p>
                  </div>
                </div>

                <div class="flex gap-2 mb-4">
                  <button
                    @click="triggerProfilePictureUpload"
                    :disabled="isUploadingPicture"
                    class="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50"
                  >
                    {{ isUploadingPicture ? "Uploading..." : "Change Photo" }}
                  </button>
                  <button
                    @click="removeProfilePicture"
                    :disabled="isUploadingPicture"
                    class="px-3 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>

                <input
                  ref="profilePictureInput"
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  @change="handleProfilePictureUpload"
                  class="hidden"
                />

                <p v-if="errorMessage" class="mb-3 text-sm text-red-500">
                  {{ errorMessage }}
                </p>

                <button
                  @click="logout"
                  class="w-full py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Log Out
                </button>
              </div>

              <!-- Not logged in -->
              <div v-else>
                <div class="flex mb-4 border-b">
                  <button
                    @click="authTab = 'login'"
                    :class="authTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'"
                    class="w-1/2 pb-2 font-semibold text-center"
                  >
                    Login
                  </button>
                  <button
                    @click="authTab = 'signup'"
                    :class="authTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'"
                    class="w-1/2 pb-2 font-semibold text-center"
                  >
                    Sign Up
                  </button>
                </div>

                <!-- Login Form -->
                <div v-if="authTab === 'login'">
                  <h2 class="mb-3 text-lg font-bold text-gray-800">Welcome Back</h2>
                  <input
                    v-model="loginForm.email"
                    type="email"
                    placeholder="Email"
                    class="w-full px-3 py-2 mb-2 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    v-model="loginForm.password"
                    type="password"
                    placeholder="Password"
                    class="w-full px-3 py-2 mb-3 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    @click="login"
                    class="w-full py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Log In
                  </button>
                  <p v-if="errorMessage" class="mt-2 text-sm text-red-500">
                    {{ errorMessage }}
                  </p>
                </div>

                <!-- Sign Up Form -->
                <div v-else>
                  <h2 class="mb-3 text-lg font-bold text-gray-800">Create Account</h2>

                  <div class="flex flex-col items-center mb-4">
                    <div
                      class="relative flex items-center justify-center w-24 h-24 overflow-hidden border-2 border-gray-300 border-dashed rounded-full"
                    >
                      <img
                        v-if="signupPreviewImage"
                        :src="signupPreviewImage"
                        alt="Profile Preview"
                        class="object-cover w-full h-full rounded-full"
                      />
                      <div v-else class="text-sm leading-tight text-center text-gray-400">
                        <span class="block mb-1 text-3xl">+</span>
                        <span>Add Photo</span>
                      </div>
                      <input
                        id="signupProfileInput"
                        type="file"
                        accept="image/*"
                        class="absolute inset-0 opacity-0 cursor-pointer"
                        @change="onSignupProfilePictureChange"
                      />
                    </div>
                    <p class="mt-2 text-xs text-gray-500">JPEG, PNG, GIF, or WebP. Max 5MB.</p>
                  </div>

                  <input
                    v-model="signupForm.full_name"
                    type="text"
                    placeholder="Full Name"
                    class="w-full px-3 py-2 mb-2 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    v-model="signupForm.username"
                    type="text"
                    placeholder="Username"
                    class="w-full px-3 py-2 mb-2 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    v-model="signupForm.email"
                    type="email"
                    placeholder="Email"
                    class="w-full px-3 py-2 mb-2 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    v-model="signupForm.birthday"
                    type="text"
                    placeholder="dd/mm/yyyy"
                    class="w-full px-3 py-2 mb-2 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    @focus="($event.target.type = 'date')"
                    @blur="($event.target.type = 'text')"
                  />
                  <input
                    v-model="signupForm.password"
                    type="password"
                    placeholder="Password"
                    class="w-full px-3 py-2 mb-2 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    v-model="signupForm.confirm_password"
                    type="password"
                    placeholder="Confirm Password"
                    class="w-full px-3 py-2 mb-3 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />

                  <button
                    @click="signup"
                    class="w-full py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Sign Up
                  </button>
                  <p v-if="errorMessage" class="mt-2 text-sm text-red-500">
                    {{ errorMessage }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="relative z-10 pt-20">
      <slot />
      <Contacts @open-feedback="openFeedbackModal" @open-login="forceProfileDropdown" />
    </main>
    <Footer />

    <!-- Feedback Modal -->
    <FeedbackModal
      v-if="showFeedback"
      @close="showFeedback = false"
      @submitted="handleFeedbackSubmitted"
      @require-login="forceProfileDropdown"
    />
  </div>
</template>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
