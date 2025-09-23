<template>
  <section
    id="install"
    class="flex items-center justify-center w-full min-h-screen bg-transparent"
  >
    <!-- Transparent Container -->
    <div
      class="relative w-full max-w-6xl p-10 mx-auto border border-slate-700/50 rounded-2xl"
    >
      <!-- Top Install Badge -->
      <div class="absolute -translate-x-1/2 -top-20 left-1/2">
        <div
          class="inline-block px-4 py-1 text-sm rounded-full shadow-lg bg-slate-800 text-white/90"
        >
          Install Now
        </div>
      </div>

      <!-- Post Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-slate-500"></div>
          <div>
            <p class="flex items-center gap-1 text-lg font-semibold text-white">
              Facebook User
              <span class="text-blue-500">✔️</span>
            </p>
            <p class="text-sm text-gray-400">Sponsored · Just now</p>
          </div>
        </div>
        <button class="text-gray-400 hover:text-white">⋮</button>
      </div>

      <!-- Post Text -->
      <p class="mb-6 text-xl text-gray-200">
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
        <a
          href="https://chrome.google.com/webstore/detail/your-extension-id"
          target="_blank"
          class="px-8 py-3 text-sm font-medium text-white transition bg-blue-600 rounded-full hover:bg-blue-500"
        >
          Get VeriFeed Now!
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
