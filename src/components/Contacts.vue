<template>
  <section
    id="contacts"
    class="relative z-40 flex items-center justify-center w-full min-h-screen snap-start"
  >
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="mb-8 text-4xl font-bold text-white md:text-5xl">Contact Us</h2>
      <p class="max-w-2xl mx-auto mb-16 text-lg leading-relaxed text-gray-300">
        Have questions or feedback? Reach out through any of the options below.
      </p>

      <!-- Cards -->
      <div class="grid gap-8 mb-12 md:grid-cols-3">
        <!-- Meet Us -->
        <a
          href="https://www.google.com/maps/place/De+La+Salle+University+%E2%80%93+Dasmari%C3%B1as/@14.3268518,120.9548759,17z/data=!3m1!4b1!4m6!3m5!1s0x3397d5b4b36ecb49:0xcdbf0315cce20e2a!8m2!3d14.3268518!4d120.9574508!16zL20vMGQ4em5z?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
          class="block p-8 transition-colors border bg-[#0a0f2b]/60 backdrop-blur rounded-3xl border-blue-500/30 hover:bg-[#12183b]/70 group"
        >
          <div
            class="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform bg-white rounded-2xl group-hover:scale-110"
          >
            <svg class="w-8 h-8 text-[#0a0f2b]" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-xl font-bold text-white">Meet Us</h3>
          <p class="text-gray-300">De La Salle University – Dasmariñas</p>
        </a>

     <!-- Call Us -->
      <a
        href="tel:09770445480"
        class="block p-8 transition-transform transform bg-gradient-to-br from-[#1e3a8a]/80 via-[#312e81]/80 to-[#4338ca]/80 shadow-lg rounded-3xl hover:scale-105 hover:shadow-indigo-500/20"
    >
      <div
        class="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-white/10 rounded-2xl"
    >
      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path
        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
      />
          </svg>
        </div>
            <h3 class="mb-3 text-xl font-bold text-white">Call Us</h3>
            <p class="font-semibold text-gray-300">0977 044 5480</p>
      </a>


        <!-- Email Us -->
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=verifeedofficial@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          class="block p-8 transition-colors border bg-[#0a0f2b]/60 backdrop-blur rounded-3xl border-blue-500/30 hover:bg-[#12183b]/70 group"
        >
          <div
            class="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform bg-white rounded-2xl group-hover:scale-110"
          >
            <svg class="w-8 h-8 text-[#0a0f2b]" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
              />
              <path
                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-xl font-bold text-white">Email Us</h3>
          <p class="text-gray-300">verifeedofficial@gmail.com</p>
        </a>
      </div>

      <!-- Feedback Button -->
      <button
        @click="$emit('open-feedback')"
        class="relative z-50 px-10 py-4 font-semibold text-white transition-all transform border rounded-full bg-white/20 backdrop-blur border-white/30 hover:bg-white/30 hover:scale-105"
      >
        Send Feedback
      </button>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(['open-feedback'])
</script>
