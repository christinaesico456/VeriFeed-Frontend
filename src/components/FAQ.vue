<template>
  <section class="flex items-center justify-center w-full min-h-screen px-6 snap-start">
    <div class="w-full max-w-3xl mx-auto">
      <!-- Title (unchanged) -->
      <h2 class="mb-12 text-4xl font-extrabold text-center text-white md:text-5xl">
        Frequently Asked Questions
      </h2>

      <!-- FAQ List -->
      <div class="space-y-6">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="overflow-hidden transition-all duration-300 border rounded-2xl backdrop-blur-md"
          :class="openFAQ === index
            ? 'border-blue-500/50 bg-gradient-to-r from-blue-800/40 via-purple-800/40 to-pink-700/40 shadow-lg shadow-purple-700/30 scale-[1.01]'
            : 'border-white/10 bg-slate-900/20 hover:bg-slate-800/25 hover:border-blue-400/40 hover:shadow-md hover:shadow-purple-600/10'"
        >
          <!-- Question Header -->
          <button
            @click="toggleFAQ(index)"
            class="flex items-center justify-between w-full px-6 py-5 text-left"
          >
            <h3
              class="text-lg font-semibold text-white transition-colors md:text-xl"
              :class="openFAQ === index ? 'text-blue-300' : 'text-gray-200'"
            >
              {{ faq.question }}
            </h3>
            <div
              class="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full"
              :class="openFAQ === index
                ? 'bg-gradient-to-r from-blue-500/40 to-purple-500/40'
                : 'bg-slate-800/50 hover:bg-slate-700/60'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-white transition-transform duration-300"
                :class="openFAQ === index ? 'rotate-180 text-blue-400' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          <!-- Dropdown Answer -->
          <transition name="expand">
            <div v-if="openFAQ === index" class="px-6 pb-6 border-t border-blue-500/30">
              <p class="pt-4 text-base leading-relaxed text-gray-300 md:text-lg">
                {{ faq.answer }}
              </p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      openFAQ: -1,
      faqs: [
        { question: "What is VeriFeed?", answer: "VeriFeed is a browser extension that detects deepfake videos on Facebook using AI models built with ResNeXt50 and LSTM technology." },
        { question: "How does VeriFeed detect deepfakes?", answer: "It analyzes visual patterns and motion inconsistencies in videos. When manipulation is detected, VeriFeed flags it in real time." },
        { question: "Does VeriFeed have a mobile app?", answer: "Currently, VeriFeed works as a browser extension for desktop. A mobile-friendly version is being considered for future development." },
        { question: "Is VeriFeed free to use?", answer: "Yes, VeriFeed is free to install and use. It was created as part of an academic research project to promote online media awareness." },
        { question: "Does VeriFeed collect or upload user data?", answer: "No. VeriFeed runs locally in your browser, meaning no videos or personal data are uploaded. Your privacy is fully protected." },
        { question: "How accurate is VeriFeed?", answer: "Based on research testing, VeriFeed’s detection model achieved high accuracy when identifying manipulated or fake videos." },
        { question: "Can VeriFeed work on other websites besides Facebook?", answer: "This version is built specifically for Facebook videos. However, the system architecture allows for future integration with other platforms." },
        { question: "What are the system requirements to use VeriFeed?", answer: "You only need a Chromium-based browser like Google Chrome or Microsoft Edge. No additional software or setup is required." }
      ]
    }
  },
  methods: {
    toggleFAQ(index) {
      this.openFAQ = this.openFAQ === index ? -1 : index
    }
  }
}
</script>

<style>
/* Smooth expand animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s ease;
  max-height: 500px;
  opacity: 1;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
