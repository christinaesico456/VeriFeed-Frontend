<template>
  <section
    id="install"
    class="flex items-center justify-center w-full min-h-screen bg-transparent"
  >
    <div
      class="relative w-full max-w-6xl p-10 mx-auto border border-slate-700/50 rounded-2xl"
    >
      <!-- Top Install Badge -->
      <div class="absolute -translate-x-1/2 -top-20 left-1/2">
        <div
          class="inline-block px-4 py-1 text-sm border rounded-full shadow-lg bg-slate-800/80 text-white/90 backdrop-blur-sm border-slate-600/40"
        >
          Install Now
        </div>
      </div>

      <!-- Post Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <img
            src="/profile_placeholder.png"
            alt="Profile"
            class="object-cover w-12 h-12 border rounded-full border-slate-600/50"
          />
          <div>
            <p class="flex items-center gap-1 text-lg font-semibold text-white">
              Facebook User
              <span class="text-blue-500">✔️</span>
            </p>
            <p class="text-sm text-gray-400">Sponsored · Just now</p>
          </div>
        </div>
        <button class="text-xl text-gray-400 hover:text-white">⋮</button>
      </div>

      <!-- Post Text -->
      <p class="mb-6 text-lg leading-relaxed text-gray-200 md:text-xl">
        🔒 Keep your Facebook feed safe.<br />
        VeriFeed filters out fake news and harmful content directly in your feed.
      </p>

      <!-- Link Preview -->
      <div
        class="flex items-center justify-between w-full p-6 transition border rounded-lg border-slate-700 bg-slate-900/20 hover:bg-slate-900/30"
      >
        <div class="flex items-center gap-6">
          <img src="/Google_icon.png" alt="Chrome" class="w-14 h-14" />
          <div>
            <p class="text-lg font-semibold text-white">VeriFeed for Chrome</p>
            <p class="text-sm text-gray-400">Available on Chrome Web Store</p>
          </div>
        </div>

        <!-- 🌌 Gradient Button (same color as FAQ dropdown) -->
        <a
          href="https://chrome.google.com/webstore/detail/your-extension-id"
          target="_blank"
          class="relative px-8 py-3 overflow-hidden text-sm font-semibold text-white transition-transform duration-300 rounded-full hover:scale-110 animate-popPulse"
        >
          <!-- Deep aurora gradient -->
          <span
            class="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#1e3a8a,#4c1d95,#7e22ce,#9d174d)] bg-[length:300%_300%] animate-gradientFlow"
          ></span>

          <!-- Soft shimmer overlay -->
          <span
            class="absolute inset-0 bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-shimmer rounded-full"
          ></span>

          <!-- Ambient glow -->
          <span
            class="absolute inset-0 rounded-full opacity-40 blur-xl bg-[radial-gradient(circle,rgba(147,51,234,0.25),transparent_70%)] animate-pulseGlow"
          ></span>

          <!-- Text -->
          <span class="relative z-10 tracking-wide drop-shadow-[0_4px_20px_rgba(147,51,234,0.5)]">
            Get VeriFeed Now!
          </span>
        </a>
      </div>

      <!-- Reactions -->
      <div class="flex items-center justify-between mt-4 text-sm text-gray-400">
        <div class="flex items-center gap-2">
          <div class="flex -space-x-1">
            <span
              class="flex items-center justify-center w-5 h-5 text-xs text-white bg-blue-500 rounded-full"
              >👍</span
            >
            <span
              class="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full"
              >❤️</span
            >
            <span
              class="flex items-center justify-center w-5 h-5 text-xs text-white bg-yellow-400 rounded-full"
              >😮</span
            >
          </div>
          <span>1.2k</span>
        </div>
        <p>320 Comments · 89 Shares</p>
      </div>

      <div class="my-4 border-t border-slate-700"></div>

      <!-- Action Bar -->
      <div class="flex justify-around text-sm text-gray-400">
        <button class="flex items-center gap-2 hover:text-white">👍 Like</button>
        <button class="flex items-center gap-2 hover:text-white">
          💬 Comment
        </button>
        <button class="flex items-center gap-2 hover:text-white">
          ↪️ Share
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 🌈 flowing gradient animation */
@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradientFlow {
  background-size: 300% 300%;
  animation: gradientFlow 5.5s ease-in-out infinite;
}

/* ✨ shimmer movement */
@keyframes shimmerMove {
  0% { background-position: -150% 0; }
  100% { background-position: 150% 0; }
}
.animate-shimmer {
  background-size: 200% 100%;
  animation: shimmerMove 3s linear infinite;
  mix-blend-mode: overlay;
}

/* 💫 breathing glow */
@keyframes pulseGlow {
  0%, 100% { opacity: 0.25; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.08); }
}
.animate-pulseGlow {
  animation: pulseGlow 3.8s ease-in-out infinite;
}

/* 🫧 popping pulse */
@keyframes popPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
}
.animate-popPulse {
  animation: popPulse 2.8s ease-in-out infinite;
}
</style>
