<template>
  <section id="feedback-list" class="flex flex-col items-center justify-center w-full min-h-screen px-6 snap-start">
    <div class="w-full max-w-3xl p-8 shadow-xl bg-white/10 backdrop-blur rounded-2xl">
      <h2 class="mb-6 text-3xl font-bold text-center text-white">User Feedback</h2>

      <div v-if="feedbacks.length > 0" class="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        <div v-for="(fb, index) in feedbacks" :key="index"
             class="p-4 shadow-md bg-white/20 rounded-xl">
          <p class="text-gray-200">{{ fb.message }}</p>
          <span class="block mt-2 text-sm text-gray-400">
            {{ new Date(fb.date).toLocaleString() }}
          </span>
        </div>
      </div>

      <div v-else class="italic text-center text-gray-300">
        No feedback submitted yet.
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return { feedbacks: [] }
  },
  mounted() {
    this.feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]")
  }
}
</script>
