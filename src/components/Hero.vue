<template>
  <section
    id="home"
    class="relative z-10 flex items-center justify-center w-full min-h-[90vh] px-6 py-16 text-center snap-start -mb-8 overflow-hidden"
  >
    <div class="w-full max-w-5xl">
      <div class="pt-28"></div>

      <!-- Hero Heading -->
      <h1
        class="mb-6 text-6xl font-extrabold opacity-0 md:text-8xl lg:text-9xl animate-fadeUpSlow"
      >
        <span
          class="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text drop-shadow-[0_5px_25px_rgba(59,130,246,0.6)]"
        >
          VeriFeed
        </span>
      </h1>

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
          class="relative px-12 py-4 overflow-hidden text-lg font-semibold text-white transition-all transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-110 hover:shadow-2xl group"
        >
          <span class="relative z-10">Get Started</span>
          <span
            class="absolute inset-0 transition-transform duration-500 origin-left transform scale-x-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 group-hover:scale-x-100"
          ></span>
        </button>

        <button
          @click="scrollToSection('install')"
          class="relative px-12 py-4 overflow-hidden text-lg font-semibold text-white transition-all transform rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-110 hover:shadow-2xl group"
        >
          <span class="relative z-10">Install Now</span>
          <span
            class="absolute inset-0 transition-transform duration-500 origin-left transform scale-x-0 rounded-full bg-gradient-to-r from-pink-600 to-blue-500 group-hover:scale-x-100"
          ></span>
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
          }"
        >
          <div
            class="relative w-full h-full p-3 overflow-y-auto rounded-md shadow-inner bg-gray-50 custom-scrollbar"
          >
            <div class="space-y-6">
              <!-- Facebook-style posts -->
              <article
                v-for="(post, i) in posts"
                :key="i"
                class="relative transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
              >
                <!-- Header -->
                <div class="relative z-10 flex items-start justify-between p-3">
                  <div class="flex items-center gap-3">
                    <img
                      src="/profile_placeholder.png"
                      alt="Profile"
                      class="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                    />
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
                        {{ post.time }} <span class="mx-13">·</span>
                      </div>
                    </div>
                  </div>

                  <button class="text-gray-400 hover:text-gray-600">
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                      />
                    </svg>
                  </button>

                  <!-- Deepfake Detected overlay -->
                  <img
                    v-if="i === 0 && post.status === 'Deepfake Detected'"
                    src="/extension3.png"
                    alt="Deepfake detected overlay"
                    class="absolute right-[-10px] top-[5px] w-[270px] z-30 rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                  />

                  <!-- Authentic overlay -->
                  <img
                    v-if="i === 1 && post.status === 'Authentic'"
                    src="/extension2.png"
                    alt="VeriFeed extension overlay"
                    class="absolute right-[-10px] top-[5px] w-[270px] z-30 rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                <!-- Caption -->
                <div class="px-4 pb-2 text-sm font-medium text-left text-gray-800">
                  {{ post.caption }}
                </div>

                <!-- Video Section -->
                <div
                  class="relative z-0 mx-3 mb-3 overflow-hidden rounded-md aspect-video"
                >
                  <video
                    :src="i === 0 ? '/video_placeholder2.mp4' : '/video_placeholder.mp4'"
                    autoplay
                    muted
                    loop
                    playsinline
                    class="object-cover w-full h-full rounded-md brightness-95"
                  ></video>
                </div>

                <!-- Reactions -->
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
    name: "MindBlown",
    time: "October 15 at 6:04 AM",
    caption: "Titanic Interview before the sinking 🚢😱",
    status: "Deepfake Detected",
    confidence: 96.9,
    frames: 30,
    reactions: 41,
    comments: "1.3K",
    views: "20K",
  },
  {
    name: "John Doe",
    time: "October 10 at 8:01 PM",
    caption: "Cafe vibes with Friends ☕️✨",
    status: "Authentic",
    confidence: 100.0,
    frames: 26,
    reactions: 16,
    comments: "10",
    views: "4.9k",
  },
];

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style scoped>
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
  padding: 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
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
