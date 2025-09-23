<template>
  <section id="about" class="flex items-center justify-center w-full min-h-screen snap-start">
    <div class="grid items-center max-w-6xl gap-12 px-6 mx-auto md:grid-cols-2">
      <!-- Left text -->
      <div>
        <div class="inline-block px-4 py-1 rounded-full bg-slate-800 text-white/90">About VeriFeed</div>
        <h2 class="mt-6 text-3xl font-extrabold text-white md:text-4xl drop-shadow-lg">
          Deepfake Video Detection
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-gray-300">
          VeriFeed is designed to protect you from manipulated media. With cutting-edge AI, it identifies 
          deepfakes, ensures authenticity, and keeps your digital world safe.
        </p>
      </div>

      <!-- Right image mockup -->
      <div class="flex justify-center">
        <div class="p-3 border border-gray-700 shadow-2xl w-60 h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl">
          <div class="relative w-full h-full overflow-hidden bg-black rounded-2xl">
            <div class="absolute w-20 h-1 transform -translate-x-1/2 bg-gray-600 rounded-full top-4 left-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
