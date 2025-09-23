<template> 
  <div class="relative min-h-screen overflow-hidden">
    <!-- ✅ Navigation -->
    <nav 
      id="navbar"
      class="fixed top-0 left-0 z-30 w-full transition-all duration-500 ease-in-out"
      :class="isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'"
    >
      <div class="flex items-center justify-between px-8 mx-auto max-w-7xl">
      
        <!-- Logo -->
        <div class="flex items-center">
          <span 
            class="text-2xl font-extrabold bg-clip-text"
            :class="isScrolled ? 'text-gray-900' : 'text-transparent bg-gradient-to-r from-blue-500 to-pink-500'"
          >
            VF
          </span>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
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
              <a href="#about"     class="block px-4 py-2 text-sm transition-colors rounded-lg" :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'">Overview</a>
              <a href="#features"  class="block px-4 py-2 text-sm transition-colors rounded-lg" :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'">Features</a>
              <a href="#how"       class="block px-4 py-2 text-sm transition-colors rounded-lg" :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'">How it Works</a>
              <a href="#sneakpeek" class="block px-4 py-2 text-sm transition-colors rounded-lg" :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'">Video Sneak Peek</a>
              <a href="#faq"       class="block px-4 py-2 text-sm transition-colors rounded-lg" :class="isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-blue-800/50'">FAQ</a>
            </div>
          </div>

          <a href="#install" class="text-sm font-medium tracking-wide uppercase transition-colors" :class="isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-400'">
            Install
          </a>
          <a href="#contacts" class="text-sm font-medium tracking-wide uppercase transition-colors" :class="isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-400'">
            Contacts
          </a>

          <!-- Profile Button -->
          <div class="relative">
            <button 
              @click="toggleProfile"
              class="w-10 h-10 overflow-hidden border-2 rounded-full"
              :class="isScrolled ? 'border-gray-800' : 'border-white'"
            >
              <img src="/profile_placeholder.png" alt="Profile" class="object-cover w-full h-full" />
            </button>

            <!-- Profile Dropdown -->
            <div 
              v-if="showProfile"
              class="absolute right-0 z-30 p-4 mt-2 bg-white shadow-xl w-72 rounded-2xl"
            >
              <!-- If logged in -->
              <div v-if="isLoggedIn">
                <div class="flex items-center mb-3">
                  <img src="/profile_placeholder.png" alt="Profile" class="w-12 h-12 mr-3 border rounded-full" />
                  <div>
                    <p class="font-semibold text-gray-800">{{ userData.username }}</p>
                    <p class="text-sm text-gray-500">{{ userData.email }}</p>
                  </div>
                </div>
                <button @click="logout" class="w-full py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700">
                  Log Out
                </button>
              </div>

              <!-- If not logged in -->
              <div v-else>
                <h2 class="mb-3 text-lg font-bold text-gray-800">Welcome!</h2>
                <input 
                  v-model="loginForm.email" 
                  type="email" 
                  placeholder="Email" 
                  class="w-full px-3 py-2 mb-2 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  v-model="loginForm.password" 
                  type="password" 
                  placeholder="Password" 
                  class="w-full px-3 py-2 mb-3 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button @click="login" class="w-full py-2 mb-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Log In
                </button>
                <button class="w-full py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                  Sign Up
                </button>
                <p v-if="errorMessage" class="mt-2 text-sm text-red-500">{{ errorMessage }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- ✅ Main content always above background -->
    <main class="relative z-10 pt-20">
      <slot />
    <!-- Listen directly from Contacts.vue -->
    <Contacts 
      :is-logged-in="isLoggedIn"
      @open-feedback="openFeedbackModal"
      @open-login="forceProfileDropdown"
    />
  </main>

    <!-- ✅ Feedback Modal -->
      <FeedbackModal 
        v-if="showFeedback" 
        @close="showFeedback = false" 
        @submitted="handleFeedbackSubmitted"
      />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const showProfile = ref(false)
const isLoggedIn = ref(false)
const errorMessage = ref("")
const userData = ref({ username: "", email: "" })
const isScrolled = ref(false)
const showAbout = ref(false)

// Feedback states
const showFeedback = ref(false)
const isBackendConnected = ref(false) 

const loginForm = ref({ email: "", password: "" })


/* ✅ Force login popup (called when user must log in first) */
function forceProfileDropdown() {
  showProfile.value = true
  isLoggedIn.value = false
}


function openFeedbackModal() {
  if (!isLoggedIn.value) {
    // 👉 guard, dapat logged in muna
    forceProfileDropdown()
    return
  }
  if (!isBackendConnected.value) {
    alert("⚠️ Feedback system is not yet connected to the backend.")
    return
  }
  showFeedback.value = true
}

function handleFeedbackSubmitted() {
  console.log("✅ Feedback submitted successfully (local).")
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

async function login() {
  errorMessage.value = ""
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm.value)
    })
    if (!response.ok) throw new Error("Login failed")
    const data = await response.json()
    userData.value = { username: data.username, email: data.email }
    isLoggedIn.value = true
    showProfile.value = false
     isBackendConnected.value = true // 👉 kapag success login, mark backend ready
  } catch (err) {
    errorMessage.value = err.message || "Failed to connect to server"
  }
}

function logout() {
  isLoggedIn.value = false
  userData.value = { username: "", email: "" }
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

/* ✅ Scroll Detection */
onMounted(() => {
  const heroSection = document.querySelector("#home")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        isScrolled.value = !entry.isIntersecting
      })
    },
    { threshold: 0.3 }
  )
  if (heroSection) observer.observe(heroSection)
})
</script>
