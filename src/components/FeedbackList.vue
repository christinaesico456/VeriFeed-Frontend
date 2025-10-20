<script>
import api from '../services/api.js'

export default {
  props: {
    refresh: { type: Number, default: 0 } // kapag nag-submit ng bagong feedback
  },
  data() {
    return {
      feedbacks: [], // dito talaga dapat array (recent_reviews)
      summary: null, // para sa ibang info (average, total, breakdown)
      loading: false,
      defaultAvatar: '/profile_pics/default.jpg' // fallback image kung walang picture
    }
  },
  mounted() {
    this.load()
  },
  watch: {
    refresh() {
      this.load()
    }
  },
  methods: {
    async load() {
      this.loading = true
      try {
        // ✅ FIXED: Use public API call (no authentication required)
        const data = await api.getFeedbacks("General")
        this.feedbacks = data.recent_reviews || [] // ✅ feedbacks = array lang
        this.summary = data // ✅ save summary info din
      } catch (err) {
        console.error("Failed to load feedbacks", err)
        this.feedbacks = []
      } finally {
        this.loading = false
      }
    },
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleString()
    },
    // ✅ NEW: Function to get user avatar URL
    getUserAvatar(feedback) {
      if (feedback.user_picture) {
        // If user_picture already has full URL, return it
        if (feedback.user_picture.startsWith('http')) {
          return feedback.user_picture
        }
        // If it's a relative path, construct full URL
        return `http://127.0.0.1:8000${feedback.user_picture}`
      }
      return this.defaultAvatar
    },
    // ✅ NEW: Function to display rating stars
    getStars(rating) {
      if (!rating) return ''
      return '★'.repeat(rating) + '☆'.repeat(5 - rating)
    }
  }
}
</script>

<template>
  <section
    id="feedback-list"
    class="flex flex-col items-center justify-center w-full min-h-screen px-6 snap-start"
  >
    <div class="w-full max-w-3xl p-8 shadow-xl bg-white/10 backdrop-blur rounded-2xl">
      <h2 class="mb-6 text-3xl font-bold text-center text-white">User Feedback</h2>

      <!-- ✅ FIXED: Show summary stats if available -->
      <div v-if="summary && summary.total_reviews > 0" class="mb-6 text-center text-white/80">
        <p class="text-lg">
          Average Rating: <span class="font-bold text-yellow-400">{{ summary.average_rating }}/5</span>
          ({{ summary.total_reviews }} reviews)
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="italic text-center text-gray-300">
        Loading feedback...
      </div>

      <!-- May feedback -->
      <div
        v-else-if="feedbacks.length > 0"
        class="space-y-4 max-h-[60vh] overflow-y-auto pr-2"
      >
        <div
          v-for="(fb, index) in feedbacks"
          :key="fb.id || index"
          class="flex items-start gap-3 p-4 shadow-md bg-white/20 rounded-xl"
        >
          <!-- ✅ FIXED: profile picture with proper URL handling -->
          <img
            :src="getUserAvatar(fb)"
            alt="avatar"
            class="object-cover w-12 h-12 rounded-full"
            @error="$event.target.src = defaultAvatar"
          />
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <div class="font-semibold text-white">
                {{ fb.user_name || 'Anonymous' }}
              </div>
              <!-- ✅ FIXED: Show rating stars -->
              <div v-if="fb.rating" class="text-yellow-400">
                {{ getStars(fb.rating) }}
              </div>
            </div>
            
            <!-- ✅ FIXED: Show both title and comment -->
            <div v-if="fb.title" class="mb-1 font-medium text-blue-200">
              {{ fb.title }}
            </div>
            
            <p class="text-gray-200">{{ fb.comment || fb.message }}</p>
            
            <span class="block mt-2 text-sm text-gray-400">
              {{ formatDate(fb.created_at || fb.date) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Walang feedback -->
      <div v-else class="italic text-center text-gray-300">
        No feedback submitted yet.
      </div>
    </div>
  </section>
</template>