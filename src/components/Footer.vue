<template>
  <footer class="relative w-full text-gray-300 border-t bg-slate-900/90 border-slate-800">
    <!-- Optional gradient border line -->
    <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-blue-500/50"></div>

    <div class="px-6 py-12 mx-auto max-w-7xl">
      <div class="grid gap-10 md:grid-cols-3">
        <!-- Brand / Description -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <img
              src="/verifeed_logo.png"
              alt="VeriFeed"
              class="object-contain w-10 h-10"
              @error="onLogoError"
            />
            <span class="text-xl font-extrabold tracking-tight text-white select-none">
              VeriFeed
            </span>
          </div>

          <p class="max-w-md text-sm leading-relaxed text-gray-400">
            VeriFeed detects deepfake videos in real time so you can browse with confidence.
            AI-powered, privacy-first — runs locally in your browser.
          </p>

          <div class="flex flex-wrap items-center gap-2 text-sm">
            <a href="#home" class="transition hover:text-white">Home</a>
            <span class="text-gray-600">•</span>
            <a href="#about" class="transition hover:text-white">About</a>
            <span class="text-gray-600">•</span>
            <a href="#features" class="transition hover:text-white">Features</a>
            <span class="text-gray-600">•</span>
            <a href="#faq" class="transition hover:text-white">FAQ</a>
            <span class="text-gray-600">•</span>
            <a href="#contacts" class="transition hover:text-white">Contact</a>
          </div>
        </div>

        <!-- Useful links -->
        <div class="grid grid-cols-2 gap-6 md:place-self-center md:justify-self-center">
          <div>
            <h4 class="mb-3 text-sm font-semibold text-gray-200">Product</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#install" class="transition hover:text-white">Install</a></li>
              <li><a href="#how" class="transition hover:text-white">How it works</a></li>
              <li><a href="#sneakpeek" class="transition hover:text-white">Demo</a></li>
            </ul>
          </div>

          <div>
            <h4 class="mb-3 text-sm font-semibold text-gray-200">Company</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#about" class="transition hover:text-white">About</a></li>
              <li><a href="#contacts" class="transition hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        <!-- Meet the Developers -->
        <div class="flex flex-col items-start justify-center gap-5 md:items-end">
          <h4 class="text-sm font-semibold text-gray-200 md:text-right">Meet the Developers</h4>

          <div class="flex items-center justify-center gap-5 mt-2">
            <!-- Developer 1 -->
            <a
              href="https://web.facebook.com/princessgwenn.destura"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center group"
            >
              <img
                src="/gwenn.jpg"
                alt="Princess Gwenn Destura"
                class="object-cover transition-all duration-300 rounded-full w-14 h-14 hover:scale-110 hover:ring-2 hover:ring-blue-500"
              />
              <span class="mt-2 text-xs font-medium text-gray-200 group-hover:text-blue-400">
                Destura
              </span>
            </a>

            <!-- Developer 2 -->
            <a
              href="https://web.facebook.com/angelvhea.melindo.9"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center group"
            >
              <img
                src="/angel.jpg"
                alt="Angel Vhea Melindo"
                class="object-cover transition-all duration-300 rounded-full w-14 h-14 hover:scale-110 hover:ring-2 hover:ring-blue-500"
              />
              <span class="mt-2 text-xs font-medium text-gray-200 group-hover:text-blue-400">
                Melindo
              </span>
            </a>

            <!-- Developer 3 -->
            <a
              href="https://web.facebook.com/nina.esico"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center group"
            >
              <img
                src="/nina.jpg"
                alt="Christina Esico"
                class="object-cover transition-all duration-300 rounded-full w-14 h-14 hover:scale-110 hover:ring-2 hover:ring-blue-500"
              />
              <span class="mt-2 text-xs font-medium text-gray-200 group-hover:text-blue-400">
                Esico
              </span>
            </a>
          </div>

          <!-- Copyright -->
          <div class="mt-5 text-sm text-left text-gray-500 md:text-right">
            <div class="mb-1">Made with ❤ • VeriFeed</div>
            <div class="text-xs text-gray-400">
              © {{ year }} VeriFeed. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()

function onLogoError(e) {
  e.target.remove()
}
</script>
