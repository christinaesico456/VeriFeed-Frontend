<template>
  <section
    id="home"
    class="relative z-10 flex items-center justify-center w-full min-h-[90vh] px-6 py-16 text-center snap-start -mb-8 overflow-hidden"
  >
    <div class="w-full max-w-5xl">
      <div class="pt-28"></div>

      <!-- Hero Heading (animated) -->
      <h1
        class="mb-6 text-6xl font-extrabold opacity-0 md:text-8xl lg:text-9xl animate-fadeUpSlow"
      >
        <span
          class="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text drop-shadow-[0_5px_25px_rgba(59,130,246,0.6)]"
        >
          VeriFeed
        </span>
      </h1>

      <!-- Description (animated with delay) -->
      <p
        class="max-w-3xl mx-auto mb-10 text-lg leading-relaxed text-gray-300 delay-300 opacity-0 md:text-xl animate-fadeUpSlow"
      >
        Detect deepfakes with ease. VeriFeed uses advanced AI technology to keep
        your content authentic and your digital world safe.
      </p>

      <!-- Buttons -->
      <div
        class="flex flex-col justify-center gap-6 mb-10 opacity-0 sm:flex-row animate-fadeUpSlow delay-600"
      >
        <button
          @click="scrollToSection('about')"
          class="px-12 py-4 text-lg font-semibold text-white transition-all transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 hover:shadow-lg"
        >
          Get Started
        </button>
        <button
          @click="scrollToSection('install')"
          class="px-12 py-4 text-lg font-semibold text-gray-900 transition-all transform bg-white rounded-full hover:scale-105 hover:shadow-lg"
        >
          Install Now
        </button>
      </div>

      <!-- Laptop Mockup -->
      <div
        class="relative flex justify-center w-full max-w-6xl mx-auto mt-[-0.5rem] opacity-0 animate-fadeUpSlow delay-900"
      >
        <img
          src="/laptop_mockup.png"
          alt="Laptop mockup"
          class="block w-full h-auto pointer-events-none select-none"
        />

        <!-- Display inside laptop -->
        <div
          class="absolute overflow-hidden rounded-[14px] shadow-lg"
          :style="{
            top: '21%',
            left: '14.2%',
            width: '70.2%',
            height: '44%',
            transform:
              'perspective(800px) rotateX(2deg) rotateY(-0.6deg) scaleX(0.985)',
            transformOrigin: 'center center',
          }"
        >
          <div
            class="relative w-full h-full p-3 overflow-y-auto rounded-md shadow-inner bg-gray-50 custom-scrollbar"
          >
            <!-- Scrollable feed -->
            <div class="space-y-6">
              <article
                v-for="(post, i) in posts"
                :key="i"
                class="relative transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
              >
                <!-- Header -->
                <div class="flex items-start justify-between p-3">
                  <div class="flex items-center gap-3">
                    <div
                      class="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
                    ></div>
                    <div>
                      <div class="flex items-center gap-1">
                        <h3
                          class="text-sm font-semibold text-gray-900 cursor-pointer hover:underline"
                        >
                          {{ post.name }}
                        </h3>
                        <span
                          class="text-sm text-blue-500 cursor-pointer hover:underline"
                          >• Follow</span
                        >
                      </div>
                      <div class="text-xs text-gray-500">
                        {{ post.time }} <span class="mx-1">·</span> <span>🌍</span>
                      </div>
                    </div>
                  </div>
                  <button class="text-gray-400 hover:text-gray-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                      />
                    </svg>
                  </button>
                </div>

                <!-- Caption -->
                <div class="px-4 pb-2 text-sm font-medium text-gray-800">
                  {{ post.caption }}
                </div>

                <!-- Video Placeholder -->
                <div class="relative mx-3 mb-3">
                  <div
                    class="relative flex items-center justify-center overflow-hidden text-xs text-gray-600 bg-gray-200 rounded-md aspect-video"
                  >
                    [Video Placeholder]
                    <!-- VeriFeed Popup -->
                    <div
                      class="absolute transition-all duration-300 transform bg-white border border-gray-100 rounded-lg shadow-xl top-3 right-3 w-80 hover:scale-105 hover:shadow-2xl"
                    >
                      <div
                        class="flex items-center justify-between px-4 py-3 border-b border-gray-100"
                      >
                        <div class="flex items-center space-x-2">
                          <div
                            class="flex items-center justify-center w-5 h-5 rounded"
                            :class="post.status === 'Authentic'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-orange-100 text-orange-600'"
                          >
                            <svg
                              v-if="post.status === 'Authentic'"
                              class="w-3.5 h-3.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414L9 14.414l8-8a1 1 0 000-1.414z"
                              />
                            </svg>
                            <svg
                              v-else
                              class="w-3.5 h-3.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l5.01 8.907c.75 1.334-.213 2.994-1.742 2.994H4.99c-1.529 0-2.492-1.66-1.742-2.994L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-6a1 1 0 01.993.883L11 9v3a1 1 0 11-2 0V9a1 1 0 011-1z"
                              />
                            </svg>
                          </div>
                          <h4
                            class="text-sm font-semibold"
                            :class="post.status === 'Authentic'
                              ? 'text-green-700'
                              : 'text-orange-700'"
                          >
                            {{ post.status }}
                          </h4>
                        </div>
                        <span
                          class="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full"
                        >
                          VeriFeed
                        </span>
                      </div>
                      <div
                        class="px-4 py-3 text-sm leading-snug text-gray-800"
                      >
                        <p class="mb-1 font-semibold">
                          How sure we are:
                          <span class="font-bold">{{ post.confidence }}%</span>
                        </p>
                        <div
                          class="w-full h-2 mb-2 overflow-hidden bg-gray-100 rounded-full"
                        >
                          <div
                            class="h-2 rounded-full"
                            :class="post.status === 'Authentic'
                              ? 'bg-green-500'
                              : 'bg-orange-500'"
                            :style="{ width: post.confidence + '%' }"
                          ></div>
                        </div>
                        <p class="mb-1 text-xs text-gray-600">
                          We are very confident
                        </p>
                        <p
                          class="text-xs text-gray-500"
                          v-if="post.status === 'Authentic'"
                        >
                          This video is genuine and has not been edited by
                          artificial intelligence.
                        </p>
                        <p class="text-xs text-gray-500" v-else>
                          This video may have been edited or created by
                          artificial intelligence. Please verify it before
                          sharing.
                        </p>
                        <p
                          class="mt-2 text-[11px] text-gray-400 border-t border-gray-100 pt-1"
                        >
                          Computer check • This is just a guess • Always check
                          with other sources
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Reaction summary -->
                <div
                  class="flex items-center justify-between px-4 py-2 text-xs text-gray-600 border-t border-gray-100"
                >
                  <div class="flex items-center space-x-1">
                    <span>👍❤️</span><span>{{ post.reactions }}K</span>
                  </div>
                  <div class="space-x-2 text-xs text-gray-500">
                    <span>{{ post.comments }} comments</span> •
                    <span>{{ post.views }} views</span>
                  </div>
                </div>

                <!-- Like / Comment / Share -->
                <div class="flex justify-around border-t border-gray-100">
                  <button class="fb-btn">👍 Like</button>
                  <button class="fb-btn">💬 Comment</button>
                  <button class="fb-btn">↗️ Share</button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const posts = [
  {
    name: "Rated Korina",
    time: "October 10 at 8:01 PM",
    caption: "Cong Kiko: I'm CRAZY.",
    status: "Authentic",
    confidence: 99.7,
    reactions: 165,
    comments: "10.1K",
    views: "4.9M",
  },
  {
    name: "AY GRABE",
    time: "October 15 at 6:04 AM",
    caption: "Ghost whisperer 😂😂",
    status: "Deepfake Detected",
    confidence: 96.7,
    reactions: 41,
    comments: "1.3K",
    views: "20K",
  },
];

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style scoped>
/* --- Animation for Hero Section --- */
@keyframes fadeUpSlow {
  0% {
    opacity: 0;
    transform: translateY(25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeUpSlow {
  animation: fadeUpSlow 1.2s ease-out forwards;
}

/* Delay utilities */
.delay-300 {
  animation-delay: 0.3s;
}
.delay-600 {
  animation-delay: 0.6s;
}
.delay-900 {
  animation-delay: 0.9s;
}

/* Scrollbar + FB Buttons (unchanged) */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(107, 114, 128, 0.6) rgba(229, 231, 235, 0.5);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(107, 114, 128, 0.6);
  border-radius: 999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(79, 70, 229, 0.6);
}

.fb-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  background-color: transparent;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease, transform 0.2s ease, color 0.2s ease;
}

.fb-btn:hover {
  background-color: #e5e7eb;
  color: #111827;
  transform: scale(1.03);
}

.fb-btn:active {
  transform: scale(0.97);
  background-color: #d1d5db;
}
</style>
