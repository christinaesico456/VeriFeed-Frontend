<template>
  <section class="flex items-center justify-center w-full min-h-screen px-6 snap-start">
    <div class="w-full max-w-3xl mx-auto">
      <!-- Title -->
      <h2 class="mb-12 text-4xl font-extrabold text-center text-white md:text-5xl">
        Frequently Asked Questions
      </h2>

      <div class="space-y-6">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="overflow-hidden transition-all duration-300 border rounded-2xl backdrop-blur-md"
          :class="(openFAQ === index 
            ? 'border-blue-500/60 shadow-lg shadow-blue-500/30 bg-blue-900/50 scale-[1.01]' 
            : 'border-white/10 bg-white/5 hover:scale-[1.01] hover:border-blue-400/40 hover:shadow-md hover:shadow-blue-500/10')"
        >
          <!-- Question -->
          <button
            @click="toggleFAQ(index)"
            class="flex items-center justify-between w-full px-6 py-5 text-left"
          >
            <h3
              class="text-lg font-semibold text-white transition-colors md:text-xl"
              :class="openFAQ === index ? 'text-blue-300' : ''"
            >
              {{ faq.question }}
            </h3>
            <div
              class="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full"
              :class="openFAQ === index ? 'bg-blue-500/20' : 'bg-white/10'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-white transition-transform duration-300"
                :class="openFAQ === index ? 'rotate-180 text-blue-400' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          <!-- Answer -->
          <transition name="expand">
            <div
              v-if="openFAQ === index"
              class="px-6 pb-6 border-t border-blue-500/30"
            >
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
        {
          question: "What is VeriFeed?",
          answer: "VeriFeed is an AI-powered platform that detects manipulated or deepfake videos to keep your content authentic."
        },
        {
          question: "Is it available on mobile?",
          answer: "Yes, VeriFeed is available on iOS and Android devices."
        },
        {
          question: "How accurate is it?",
          answer: "Our AI achieves over 95% accuracy and continuously improves with new training data."
        },
        {
          question: "Is VeriFeed free?",
          answer: "We offer both free and premium plans, with advanced features in premium."
        }
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
