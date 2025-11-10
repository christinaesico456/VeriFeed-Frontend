<template>
  <section
    id="how"
    class="relative flex items-center justify-center w-full min-h-screen snap-start"
  >
    <div class="relative z-10 max-w-6xl px-6 mx-auto text-center">
      <!-- Header -->
      <div class="mb-10">
        <div
          class="inline-block px-4 py-1 rounded-full shadow-md bg-slate-800/60 backdrop-blur text-white/90"
        >
          How It Works
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-white md:text-4xl">
          How VeriFeed Works
        </h2>
        <p class="max-w-2xl mx-auto mt-3 text-base text-gray-300">
          Quick and easy steps to install and use VeriFeed.
        </p>
      </div>

      <!-- Steps grid -->
      <div
        class="grid items-stretch grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex flex-col justify-center items-center text-center px-6 py-6 text-white transition-all border shadow-lg rounded-3xl backdrop-blur-md bg-white/10 border-white/20 hover:scale-105 hover:shadow-blue-500/30 min-h-[160px]"
        >
          <div class="mb-3 text-3xl" :class="step.color">
            {{ step.icon }}
          </div>
          <h3 class="mb-2 text-lg font-bold text-white md:text-lg">
            {{ step.title }}
          </h3>
          <p class="max-w-xs text-xs leading-snug md:text-sm text-white/70">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Decorative glow -->
    <div
      class="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
    ></div>
  </section>
</template>

<script setup>
const steps = [
  {
    title: "Click Get VeriFeed Now",
    description: "Tap the button above to open VeriFeed on Chrome Web Store.",
    icon: "🖱️",
    color: "text-purple-400",
  },
  {
    title: "Add to Chrome",
    description: "Click ‘Add to Chrome’ to install the extension.",
    icon: "🔗",
    color: "text-blue-400",
  },
  {
    title: "Open Facebook",
    description: "Go to Facebook and play any video.",
    icon: "📘",
    color: "text-green-400",
  },
  {
    title: "Run VeriFeed",
    description: "Click the icon to analyze the video.",
    icon: "▶️",
    color: "text-indigo-400",
  },
  {
    title: "Check Results",
    description: "See if the video is Deepfake or Real.",
    icon: "📊",
    color: "text-yellow-400",
  },
  {
    title: "Share Feedback",
    description: "Log in to send feedback or suggestions.",
    icon: "💬",
    color: "text-cyan-400",
  },
];
</script>



<style scoped>
/* Fade-up animation */
.fade-up-enter-active {
  transition: all 0.6s ease-out;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(25px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Optional class to handle scroll reveal manually */
.fade-up-enter-active.show {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
</style>
