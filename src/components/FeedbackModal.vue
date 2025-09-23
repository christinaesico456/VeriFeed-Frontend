<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div class="w-full max-w-lg p-8 bg-white shadow-xl rounded-2xl">
      <h2 class="mb-4 text-xl font-bold text-gray-900">Send Feedback</h2>

      <textarea
        v-model="message"
        placeholder="Type your feedback..."
        class="w-full h-32 p-3 text-gray-900 placeholder-gray-400 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
      ></textarea>

      <div class="flex justify-end gap-3 mt-4">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="submitFeedback"
          class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { 
      message: "",
      isSubmitting: false,
      error: "" 
    }
  },
  methods: {
    async submitFeedback() {
      if (!this.message.trim()) return
      this.isSubmitting = true
      this.error = ""

      try {
        // 👉 kapag hindi pa connected backend (simulate)
        const backendConnected = false // toggle to true kapag may API na

        if (backendConnected) {
          // ✅ Ready na for backend integration
          const response = await fetch("http://127.0.0.1:8000/api/feedback/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: this.message })
          })
          if (!response.ok) throw new Error("Failed to send feedback")
        } else {
          // 📝 Local fallback (temporary storage)
          let feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]")
          feedbacks.push({ message: this.message, date: new Date() })
          localStorage.setItem("feedbacks", JSON.stringify(feedbacks))
        }

        this.$emit("submitted")
        this.$emit("close")
      } catch (err) {
        this.error = err.message || "Something went wrong"
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

