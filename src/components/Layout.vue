<script setup>
import { ref, onMounted, computed } from "vue"
import api from "../services/api.js"
import FeedbackModal from "./FeedbackModal.vue"
import OTPInput from "./OTPInput.vue"
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

// Mobile menu state
const showMobileMenu = ref(false)

// Feedback states
const showFeedback = ref(false)
const isBackendConnected = ref(false)

// Profile picture upload states
const profilePictureInput = ref(null)
const isUploadingPicture = ref(false)
const uploadSuccess = ref(false)  
const profilePicturePreview = ref(null)
const showRemoveConfirm = ref(false)
const isRemovingPicture = ref(false)  

// 2FA OTP states
const showOTPModal = ref(false)
const otpStep = ref('credentials') // 'credentials' or 'otp'
const pendingCredentials = ref(null)
const otpPurpose = ref('login')
const otpExpiresIn = ref(300)
const otpError = ref(null)
const isVerifyingOTP = ref(false)
const otpInputRef = ref(null)

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
const signupPreviewImage = ref(null)

const profilePictureUrl = computed(() => {
  if (profilePicturePreview.value) {
    return profilePicturePreview.value
  }
  
  const API_URL = "https://verifeed-backend-production.up.railway.app";
  const baseUrl = userData.value.profile_picture || '/media/profile_pics/default.jpg'
  
  // If it's already a full URL, return it
 if (baseUrl.startsWith('http')) {
    // Force HTTPS
    const httpsUrl = baseUrl.replace('http://', 'https://');
    
    if (!baseUrl.includes('default.jpg')) {
      const separator = httpsUrl.includes('?') ? '&' : '?'
      return `${httpsUrl}${separator}v=${Date.now()}`
    }
    return httpsUrl
  }
  
  // If it's a relative path, prepend API URL with HTTPS
  const fullUrl = `${API_URL}${baseUrl}`
  if (!baseUrl.includes('default.jpg')) {
    return `${fullUrl}?v=${Date.now()}`
  }
  
  return fullUrl
})

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

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}

function closeMobileMenu() {
  showMobileMenu.value = false
  showAbout.value = false
}

/* -- PROFILE PICTURE HANDLERS -- */
function triggerProfilePictureUpload() {
  if (profilePictureInput.value) {
    profilePictureInput.value.click()
  }
}

async function handleProfilePictureUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  profilePicturePreview.value = URL.createObjectURL(file)

  isUploadingPicture.value = true
  errorMessage.value = ""
  uploadSuccess.value = false

  try {
    const formData = new FormData()
    formData.append("profile_picture", file)

    const response = await api.uploadProfilePicture(formData)

    if (response.user) {
      userData.value = {
        ...userData.value,
        ...response.user,
        profile_picture: response.user.profile_picture || response.profile_picture_url
      }
    } else if (response.profile_picture_url) {
      userData.value.profile_picture = response.profile_picture_url
    }
    
    localStorage.setItem("user", JSON.stringify(userData.value))
    
    setTimeout(() => {
      profilePicturePreview.value = null
    }, 500)
    
    uploadSuccess.value = true
    
    setTimeout(() => {
      uploadSuccess.value = false
    }, 3000)
    
  } catch (err) {
    errorMessage.value = err.message || "Failed to upload picture"
    console.error("Upload error:", err)
    profilePicturePreview.value = null
  } finally {
    isUploadingPicture.value = false
    if (event.target) event.target.value = ''
  }
}

// Remove Profile Modal
function openRemoveConfirm() {
  showRemoveConfirm.value = true
}

function closeRemoveConfirm() {
  showRemoveConfirm.value = false
}

async function confirmRemoveProfilePicture() {
  isRemovingPicture.value = true
  errorMessage.value = ""
  profilePicturePreview.value = null

  try {
    const response = await api.removeProfilePicture()

    if (response.user) {
      userData.value = {
        ...userData.value,
        ...response.user,
        profile_picture: response.user.profile_picture || response.profile_picture_url
      }
    } else if (response.profile_picture_url) {
      userData.value.profile_picture = response.profile_picture_url
    }

    localStorage.setItem("user", JSON.stringify(userData.value))
    showRemoveConfirm.value = false
  } catch (err) {
    errorMessage.value = err.message || "Failed to remove picture"
    console.error("Remove error:", err)
  } finally {
    isRemovingPicture.value = false
  }
}


async function removeProfilePicture() {
  if (!confirm("Are you sure you want to remove your profile picture?")) {
    return
  }
  
  isUploadingPicture.value = true
  errorMessage.value = ""
  profilePicturePreview.value = null

  try {
    const response = await api.removeProfilePicture()
    
    // Update userData with default picture
    if (response.user) {
      userData.value = {
        ...userData.value,
        ...response.user,
        profile_picture: response.user.profile_picture || response.profile_picture_url
      }
    } else if (response.profile_picture_url) {
      userData.value.profile_picture = response.profile_picture_url
    }
    
    // Update localStorage
    localStorage.setItem("user", JSON.stringify(userData.value))
    
  } catch (err) {
    errorMessage.value = err.message || "Failed to remove picture"
    console.error("Remove error:", err)
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
      first_name: profile.first_name,
      last_name: profile.last_name,
    }
    localStorage.setItem("user", JSON.stringify(userData.value))
  } catch (e) {
    console.error("Failed to fetch profile", e)
  }
}

/* -- 2FA LOGIN FLOW -- */
async function login() {
  errorMessage.value = ""
  otpError.value = null
  
  try {
    // Request OTP
    const response = await api.requestOTP({
      usernameOrEmail: loginForm.value.email,
      password: loginForm.value.password
    }, 'login')
    
    if (response.requires_otp) {
      // Store credentials for OTP verification
      pendingCredentials.value = {
        usernameOrEmail: loginForm.value.email
      }
      otpPurpose.value = 'login'
      otpExpiresIn.value = response.expires_in || 300
      
      // Show OTP modal
      showOTPModal.value = true
      otpStep.value = 'otp'
    }
  } catch (err) {
    errorMessage.value = err.message || String(err)
  }
}

async function handleOTPComplete(otpCode) {
  otpError.value = null
  isVerifyingOTP.value = true
  
  try {
    // Verify OTP
    const response = await api.verifyOTP(
      pendingCredentials.value,
      otpCode,
      otpPurpose.value
    )
    
    // Success, Update UI
    await fetchAndSetProfile()
    isLoggedIn.value = true
    showProfile.value = false
    showOTPModal.value = false
    isBackendConnected.value = true
    
    // Reset forms
    loginForm.value = { email: "", password: "" }
    pendingCredentials.value = null
    
  } catch (err) {
    otpError.value = err.message || 'Invalid OTP code'
    // Reset OTP input
    if (otpInputRef.value) {
      otpInputRef.value.reset()
    }
  } finally {
    isVerifyingOTP.value = false
  }
}

async function handleResendOTP() {
  otpError.value = null
  
  try {
    const response = await api.resendOTP(
      pendingCredentials.value,
      otpPurpose.value
    )
    
    // Update expiration time
    otpExpiresIn.value = response.expires_in || 300
    
    // Reset OTP input
    if (otpInputRef.value) {
      otpInputRef.value.reset()
    }
  } catch (err) {
    otpError.value = err.message || 'Failed to resend OTP'
  }
}

function closeOTPModal() {
  showOTPModal.value = false
  otpStep.value = 'credentials'
  pendingCredentials.value = null
  otpError.value = null
}

/* -- SIGNUP -- */
async function signup() {
  errorMessage.value = ""
  otpError.value = null
  
  // Validate passwords match
  if (signupForm.value.password !== signupForm.value.confirm_password) {
    errorMessage.value = "Passwords do not match"
    return
  }
  
  try {
    // Register user (creates account but not logged in yet)
    await api.registerUser(signupForm.value)
    
    // Request OTP for the new account
    const response = await api.requestOTP({
      usernameOrEmail: signupForm.value.email,
      password: signupForm.value.password
    }, 'signup')
    
    if (response.requires_otp) {
      // Store credentials for OTP verification
      pendingCredentials.value = {
        usernameOrEmail: signupForm.value.email
      }
      otpPurpose.value = 'signup'
      otpExpiresIn.value = response.expires_in || 300
      
      // Show OTP modal
      showOTPModal.value = true
      otpStep.value = 'otp'
      
      // Clear signup form
      signupForm.value = {
        full_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        profile_picture: null,
        birthday: "",
      }
      signupPreviewImage.value = null
    }
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
    const mobileMenu = document.querySelector("#mobile-menu")
    const hamburger = document.querySelector("#hamburger-button")
    
    if (navbar && !navbar.contains(e.target)) {
      showAbout.value = false
    }
    
    // Close mobile menu if clicking outside
    if (mobileMenu && hamburger && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      showMobileMenu.value = false
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

        <!-- Desktop Nav links -->
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
                isScrolled
                  ? 'bg-white shadow-lg border border-gray-200'
                  : 'bg-blue-900/90 border border-blue-500/30',
                showAbout ? '' : 'hidden'
              ]"
            >
              <a
                href="#about"
                class="block px-4 py-2 text-sm transition-colors rounded-lg"
                :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'"
              >
                Overview
              </a>
              <a
                href="#features"
                class="block px-4 py-2 text-sm transition-colors rounded-lg"
                :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'"
              >
                Features
              </a>
              <a
                href="#how"
                class="block px-4 py-2 text-sm transition-colors rounded-lg"
                :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'"
              >
                How it Works
              </a>
              <a
                href="#sneakpeek"
                class="block px-4 py-2 text-sm transition-colors rounded-lg"
                :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'"
              >
                Video Sneak Peek
              </a>
              <a
                href="#faq"
                class="block px-4 py-2 text-sm transition-colors rounded-lg"
                :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'"
              >
                FAQ
              </a>
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

          <!-- Profile Button (Desktop) -->
          <div class="relative">
            <button
              @click="toggleProfile"
              class="relative w-10 h-10 overflow-hidden transition-transform border-2 rounded-full hover:scale-105"
              :class="isScrolled ? 'border-gray-800' : 'border-white'"
            >
              <img
                :src="profilePictureUrl"
                :alt="userData.username || 'Profile'"
                class="object-cover w-full h-full"
                :key="profilePictureUrl"
                @error="$event.target.src = '/profile_placeholder.png'"
              />
              <div
                v-if="isLoggedIn"
                class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"
              ></div>
            </button>

            <!-- Profile Dropdown -->
            <div
              v-if="showProfile"
              class="absolute right-0 z-30 p-6 mt-2 text-gray-800 bg-white border border-gray-200 shadow-2xl w-80 rounded-2xl"
            >
              <!-- Logged In -->
              <div v-if="isLoggedIn">
                <div class="flex items-center mb-4">
                  <div class="relative">
                    <img
                      :src="profilePictureUrl"
                      :alt="userData.username"
                      :key="profilePictureUrl"
                      class="object-cover w-16 h-16 mr-4 border-2 border-gray-200 rounded-full"
                      @error="$event.target.src = '/profile_placeholder.png'"
                    />
                    <button
                      @click="triggerProfilePictureUpload"
                      :disabled="isUploadingPicture"
                      class="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100"
                      title="Change profile picture"
                    >
                      <svg
                        v-if="!isUploadingPicture"
                        class="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                    <div
                      v-if="isUploadingPicture"
                      class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
                    >
                      <div class="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <div
                      v-if="uploadSuccess"
                      class="absolute inset-0 flex items-center justify-center transition-opacity bg-green-500 bg-opacity-75 rounded-full"
                    >
                      <svg
                        class="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div class="flex-1">
                    <p class="font-semibold text-gray-800">{{ userData.username }}</p>
                    <p class="text-sm text-gray-500">{{ userData.email }}</p>
                  </div>
                </div>

                <input
                  ref="profilePictureInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleProfilePictureUpload"
                />

                <div class="flex gap-2 mb-4">
                  <button
                    @click="triggerProfilePictureUpload"
                    :disabled="isUploadingPicture"
                    class="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50"
                  >
                    {{ isUploadingPicture ? "Uploading..." : "Change Photo" }}
                  </button>
                  <button
                    @click="openRemoveConfirm"
                    :disabled="isUploadingPicture"
                    class="px-3 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>

                <button
                  @click="logout"
                  class="w-full py-2 text-sm text-white transition-all rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90"
                >
                  Log Out
                </button>
              </div>

              <!-- Not Logged In -->
              <div v-else>
                <!-- Tabs -->
                <div class="relative flex justify-between pb-1 mb-6 border-b border-gray-200">
                  <button
                    @click="authTab = 'login'"
                    class="relative w-1/2 pb-2 font-medium text-center transition-all duration-300"
                    :class="authTab === 'login'
                      ? 'text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text'
                      : 'text-gray-500 hover:text-gray-700'"
                  >
                    Login
                  </button>
                  <button
                    @click="authTab = 'signup'"
                    class="relative w-1/2 pb-2 font-medium text-center transition-all duration-300"
                    :class="authTab === 'signup'
                      ? 'text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text'
                      : 'text-gray-500 hover:text-gray-700'"
                  >
                    Sign Up
                  </button>
                  <div
                    class="absolute bottom-0 h-[2px] w-[40%] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-in-out"
                    :class="authTab === 'login' ? 'left-[25%]' : 'left-[75%]'"
                    style="transform: translateX(-50%);"
                  ></div>
                </div>

                <!-- Login Form -->
                <div v-if="authTab === 'login'" class="animate-fadeIn">
                  <h2 class="mb-4 text-lg font-semibold text-gray-800">Welcome Back</h2>
                  <input
                    v-model="loginForm.email"
                    type="email"
                    placeholder="Username"
                    class="w-full px-3 py-2 mb-2 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    v-model="loginForm.password"
                    type="password"
                    placeholder="Password"
                    class="w-full px-3 py-2 mb-3 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p class="mb-1 text-xs text-center text-gray-500 whitespace-nowrap">
                    Don't have an account yet?
                    <button
                      @click="authTab = 'signup'"
                      class="font-semibold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text hover:opacity-80"
                    >
                      Sign Up here
                    </button>
                  </p>
                  <button
                    @click="login"
                    class="w-full py-2 mt-1 text-sm text-white transition-all rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90"
                  >
                    Log In
                  </button>
                  <p v-if="errorMessage" class="mt-2 text-sm text-red-500">{{ errorMessage }}</p>
                </div>

                <!-- Signup Form -->
                <div v-else class="animate-fadeIn">
                  <h2 class="mb-4 text-lg font-semibold text-gray-800">Create Account</h2>
                  <div class="flex flex-col items-center mb-4">
                    <div
                      class="relative flex items-center justify-center w-24 h-24 overflow-hidden border-2 border-gray-300 border-dashed rounded-full bg-gray-50"
                    >
                      <img
                        v-if="signupPreviewImage"
                        :src="signupPreviewImage"
                        alt="Profile Preview"
                        class="object-cover w-full h-full rounded-full"
                      />
                      <div v-else class="text-sm leading-tight text-center text-gray-500">
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
                    <p class="mt-2 text-xs text-gray-500">
                      JPEG or PNG. Max 5MB.
                    </p>
                  </div>
                  <input v-model="signupForm.full_name" type="text" placeholder="Full Name" class="input-field" />
                  <input v-model="signupForm.username" type="text" placeholder="Username" class="input-field" />
                  <input v-model="signupForm.email" type="email" placeholder="Email" class="input-field" />
                  <input
                    v-model="signupForm.birthday"
                    type="text"
                    placeholder="dd/mm/yyyy"
                    class="input-field"
                    @focus="($event.target.type = 'date')"
                    @blur="($event.target.type = 'text')"
                  />
                  <input v-model="signupForm.password" type="password" placeholder="Password" class="input-field" />
                  <input v-model="signupForm.confirm_password" type="password" placeholder="Confirm Password" class="mb-3 input-field" />
                  <button
                    @click="signup"
                    class="w-full py-2 mt-1 font-semibold text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90"
                  >
                    Sign Up
                  </button>
                  <p class="mt-3 text-xs text-center text-gray-600">
                    Already have an account?
                    <button
                      @click="authTab = 'login'"
                      class="font-semibold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text hover:opacity-80"
                    >
                      Log In here
                    </button>
                  </p>
                  <p v-if="errorMessage" class="mt-2 text-sm text-red-500">{{ errorMessage }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile: Hamburger + Profile -->
        <div class="flex items-center gap-4 md:hidden">
          <!-- Profile Button (Mobile) -->
          <button
            @click="toggleProfile"
            class="relative w-10 h-10 overflow-hidden transition-transform border-2 rounded-full hover:scale-105"
            :class="isScrolled ? 'border-gray-800' : 'border-white'"
          >
            <img
              :src="profilePictureUrl"
              :alt="userData.username || 'Profile'"
              class="object-cover w-full h-full"
              :key="profilePictureUrl"
              @error="$event.target.src = '/profile_placeholder.png'"
            />
            <div
              v-if="isLoggedIn"
              class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"
            ></div>
          </button>

          <!-- Hamburger Button -->
          <button
            id="hamburger-button"
            @click="toggleMobileMenu"
            class="relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 transition-all"
            :class="isScrolled ? 'text-gray-800' : 'text-white'"
          >
            <span
              class="block w-6 h-0.5 bg-current transition-all duration-300"
              :class="showMobileMenu ? 'rotate-45 translate-y-2' : ''"
            ></span>
            <span
              class="block w-6 h-0.5 bg-current transition-all duration-300"
              :class="showMobileMenu ? 'opacity-0' : ''"
            ></span>
            <span
              class="block w-6 h-0.5 bg-current transition-all duration-300"
              :class="showMobileMenu ? '-rotate-45 -translate-y-2' : ''"
            ></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        id="mobile-menu"
        class="overflow-hidden transition-all duration-300 ease-in-out md:hidden"
        :class="[
          showMobileMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-blue-900/95 backdrop-blur-md'
        ]"
      >
        <div class="px-8 py-4 space-y-3">
          <a
            href="#home"
            @click="closeMobileMenu"
            class="block py-2 text-sm font-medium tracking-wide uppercase transition-colors"
            :class="isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-400'"
          >
            Home
          </a>

          <!-- Mobile About Section -->
          <div>
            <button
              @click="toggleAbout"
              class="flex items-center justify-between w-full py-2 text-sm font-medium tracking-wide uppercase transition-colors"
              :class="isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-400'"
            >
              About
              <svg
                class="w-4 h-4 transition-transform"
                :class="showAbout ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              v-if="showAbout"
              class="pl-4 mt-2 space-y-2 border-l-2"
              :class="isScrolled ? 'border-gray-300' : 'border-blue-400'"
            >
              <a
                href="#about"
                @click="closeMobileMenu"
                class="block py-1 text-sm transition-colors"
                :class="isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-blue-300'"
              >
                Overview
              </a>
              <a
                href="#features"
                @click="closeMobileMenu"
                class="block py-1 text-sm transition-colors"
                :class="isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-blue-300'"
              >
                Features
              </a>
              <a
                href="#how"
                @click="closeMobileMenu"
                class="block py-1 text-sm transition-colors"
                :class="isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-blue-300'"
              >
                How it Works
              </a>
              <a
                href="#sneakpeek"
                @click="closeMobileMenu"
                class="block py-1 text-sm transition-colors"
                :class="isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-blue-300'"
              >
                Video Sneak Peek
              </a>
              <a
                href="#faq"
                @click="closeMobileMenu"
                class="block py-1 text-sm transition-colors"
                :class="isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-blue-300'"
              >
                FAQ
              </a>
            </div>
          </div>

          <a
            href="#install"
            @click="closeMobileMenu"
            class="block py-2 text-sm font-medium tracking-wide uppercase transition-colors"
            :class="isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-400'"
          >
            Install
          </a>

          <a
            href="#contacts"
            @click="closeMobileMenu"
            class="block py-2 text-sm font-medium tracking-wide uppercase transition-colors"
            :class="isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-400'"
          >
            Contacts
          </a>
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

    <!-- Remove Confirmation Modal -->
    <div
      v-if="showRemoveConfirm"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div class="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl">
        <h3 class="mb-4 text-xl font-semibold text-center text-gray-800">
          Are you sure you want to remove your profile picture?
        </h3>
        <div class="flex justify-center gap-4">
          <button
            @click="confirmRemoveProfilePicture"
            class="px-5 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
            :disabled="isRemovingPicture"
          >
            {{ isRemovingPicture ? "Removing..." : "Yes, Remove" }}
          </button>
          <button
            @click="closeRemoveConfirm"
            class="px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- OTP Verification Modal -->
    <div
      v-if="showOTPModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      @click.self="closeOTPModal"
    >
      <div class="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
        <div class="mb-6 text-center">
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">Verify Your Identity</h3>
          <p class="mt-2 text-sm text-gray-600">We've sent a 6-digit code to your email</p>
        </div>

        <OTPInput
          ref="otpInputRef"
          :expires-in="otpExpiresIn"
          :error="otpError"
          @complete="handleOTPComplete"
          @resend="handleResendOTP"
        />

        <div v-if="isVerifyingOTP" class="mt-4 text-center">
          <div class="inline-block w-6 h-6 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p class="mt-2 text-sm text-gray-600">Verifying...</p>
        </div>

        <button
          @click="closeOTPModal"
          class="w-full px-4 py-2 mt-6 text-sm text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
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
/* Input field spacing and style */
.input-field {
  width: 100%;
  padding: 10px 14px;
  font-size: 0.95rem;
  color: #374151;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  margin-bottom: 0.30rem; 
  transition: all 0.2s ease;
}

.input-field::placeholder {
  color: #9ca3af;
}

.input-field:focus {
  border-color: #a855f7;
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.15);
}
.signup-photo {
  width: 2rem; 
  height: 4rem;
  border: 2px dashed #d1d5db;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  overflow: hidden;
  transition: all 0.3s ease;
}

.signup-photo:hover {
  border-color: #a855f7;
  background-color: #fdfcff;
}

.signup-photo span {
  color: #9ca3af;
  font-size: 0.85rem;
}

.underline-slide {
  transition: left 0.4s ease-in-out;
}
</style>