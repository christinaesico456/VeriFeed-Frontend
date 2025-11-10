<template>
  <div class="flex flex-col items-center justify-center otp-input-container">
    <!-- OTP Inputs -->
    <div class="flex justify-center gap-3 mb-4">
      <input
        v-for="(digit, index) in digits"
        :key="index"
        :ref="el => inputRefs[index] = el"
        v-model="digits[index]"
        type="text"
        inputmode="numeric"
        maxlength="1"
        class="otp-box"
        :class="[
          error ? 'border-red-500' : 'border-indigo-400/50',
          digits[index] ? 'bg-gradient-to-r from-indigo-100 to-purple-100' : 'bg-transparent'
        ]"
        @input="handleInput(index, $event)"
        @keydown="handleKeydown(index, $event)"
        @paste="handlePaste"
      />
    </div>

    <!-- Timer Display -->
    <div v-if="expiresIn > 0" class="mb-2 text-sm text-gray-400">
      Code expires in 
      <span class="font-semibold text-indigo-400">{{ formatTime(timeRemaining) }}</span>
    </div>

    <!-- Expired Message -->
    <div v-else class="mb-2 text-sm text-red-500">
      ⚠️ Code expired. Please request a new one.
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mb-2 text-sm font-medium text-center text-red-500">
      {{ error }}
    </div>

    <!-- Resend Button -->
    <div class="mt-2 text-center">
      <button
        @click="$emit('resend')"
        :disabled="resendDisabled"
        class="text-sm font-semibold text-indigo-400 transition-colors duration-300 hover:text-indigo-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        {{ resendDisabled ? `Resend in ${resendCooldown}s` : 'Resend Code' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  length: {
    type: Number,
    default: 6
  },
  expiresIn: {
    type: Number,
    default: 300 // 5 minutes
  },
  error: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['complete', 'resend'])

// State
const digits = ref(Array(props.length).fill(''))
const inputRefs = ref([])
const timeRemaining = ref(props.expiresIn)
const resendCooldown = ref(0)
const timer = ref(null)
const resendTimer = ref(null)

// Computed
const resendDisabled = computed(() => resendCooldown.value > 0)

// Methods
function handleInput(index, event) {
  const value = event.target.value
  if (!/^\d*$/.test(value)) {
    digits.value[index] = ''
    return
  }

  digits.value[index] = value

  // Auto-focus next input
  if (value && index < props.length - 1) {
    inputRefs.value[index + 1]?.focus()
  }

  // Emit when all filled
  if (digits.value.every(d => d !== '')) {
    emit('complete', digits.value.join(''))
  }
}

function handleKeydown(index, event) {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
  if (event.key === 'ArrowLeft' && index > 0) inputRefs.value[index - 1]?.focus()
  if (event.key === 'ArrowRight' && index < props.length - 1) inputRefs.value[index + 1]?.focus()
}

function handlePaste(event) {
  event.preventDefault()
  const pastedData = event.clipboardData.getData('text').trim()
  if (!/^\d+$/.test(pastedData)) return

  const pastedDigits = pastedData.split('').slice(0, props.length)
  pastedDigits.forEach((digit, index) => {
    if (index < props.length) digits.value[index] = digit
  })

  const nextIndex = Math.min(pastedDigits.length, props.length - 1)
  inputRefs.value[nextIndex]?.focus()

  if (digits.value.every(d => d !== '')) {
    emit('complete', digits.value.join(''))
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function startTimer() {
  timer.value = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      clearInterval(timer.value)
    }
  }, 1000)
}

function startResendCooldown() {
  resendCooldown.value = 30 // 30 seconds
  resendTimer.value = setInterval(() => {
    if (resendCooldown.value > 0) resendCooldown.value--
    else clearInterval(resendTimer.value)
  }, 1000)
}

function reset() {
  digits.value = Array(props.length).fill('')
  timeRemaining.value = props.expiresIn
  inputRefs.value[0]?.focus()
}

defineExpose({ reset })

onMounted(() => {
  startTimer()
  inputRefs.value[0]?.focus()
})

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value)
  if (resendTimer.value) clearInterval(resendTimer.value)
})

watch(() => props.expiresIn, () => {
  timeRemaining.value = props.expiresIn
  startResendCooldown()
})
</script>

<style scoped>
.otp-input-container {
  width: 100%;
  max-width: 400px;
}

.otp-box {
  width: 48px;
  height: 60px;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  color: #1f2937; /* dark gray text */
  border: 2px solid #d1d5db; /* light gray visible border */
  border-radius: 12px;
  outline: none;
  background: #ffffff; /* solid white background for visibility */
  transition: all 0.25s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.otp-box:focus {
  border-color: #a855f7; /* violet border when focused */
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.3);
}

.otp-box:hover {
  border-color: #8b5cf6; /* subtle hover color */
}

/* Optional — make active digits slightly highlighted */
.otp-box:not(:placeholder-shown) {
  background: #ffffff;
  border-color: #c3c2c4;
}

.otp-input-container input::-webkit-outer-spin-button,
.otp-input-container input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.otp-input-container input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
