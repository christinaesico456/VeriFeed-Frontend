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
            <span
              class="text-xl font-extrabold tracking-tight text-white select-none"
              >VeriFeed</span
            >
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
              <li><a href="#" class="transition hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>

        <!-- Social + CTA -->
        <div class="flex flex-col items-start justify-center gap-4 md:items-end">
          <!-- Follow Us + Social Icons -->
          <div class="flex flex-col items-start gap-2 md:items-end">
            <h4 class="text-sm font-semibold text-gray-200">Check us</h4>

            <div class="flex items-center gap-3">
              <!-- Facebook -->
              <a
                class="p-2 transition rounded-md bg-white/5 hover:text-blue-500 hover:bg-white/10"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VeriFeed on Facebook"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M22 12a10 10 0 10-11.5 9.9v-7H8.5v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z"
                  />
                </svg>
              </a>

              <!-- GitHub -->
              <a
                class="p-2 transition rounded-md bg-white/5 hover:text-gray-200 hover:bg-white/10"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VeriFeed on GitHub"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 6.9 9.4.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 1.8 2.4 2.5.2-.1.4-.2.6-.4-.2-.9-.7-1.6-1.2-1.9-2.3-.3-4.7-1.1-4.7-5 0-1.1.4-2 1.1-2.8-.2-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .9.9-.2 1.9-.3 2.9-.3s2 .1 2.9.3c2.1-1.2 3-.9 3-.9.6 1.5.3 2.6.1 2.9.7.8 1.1 1.7 1.1 2.8 0 3.9-2.4 4.7-4.7 5 .4.3.8 1 .8 2v3c0 .3.2.6.7.5A10 10 0 0022 12c0-5.5-4.5-10-10-10z"
                  />
                </svg>
              </a>

              <!-- LinkedIn -->
              <a
                class="p-2 transition rounded-md bg-white/5 hover:text-blue-400 hover:bg-white/10"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VeriFeed on LinkedIn"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7 0h4.8v2.2h.1c.7-1.2 2.6-2.2 5.3-2.2 5.7 0 6.7 3.7 6.7 8.5V24H19V15.2c0-2.1 0-4.7-2.9-4.7-2.9 0-3.3 2.2-3.3 4.5V24H7V8z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Copyright -->
          <div class="text-sm text-left text-gray-500 md:text-right">
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
  e.target.remove() // fallback: removes broken image if logo fails
}
</script>
