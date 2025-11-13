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
          VeriFeed is a browser extension that detects deepfake videos on Facebook in real time.
          It uses AI to analyze video frames and identify facial manipulations.
          This tool helps users stay informed and safe while browsing online.
        </p>
      </div>

      <!-- Right image with simple effects -->
      <div class="flex justify-center">
        <div class="relative group">
          <!-- Subtle glow -->
          <div class="absolute transition-opacity duration-500 -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40"></div>
          
          <!-- Image -->
          <img 
            src="/extension1.png" 
            alt="VeriFeed Extension Interface" 
            class="relative z-10 w-full max-w-xs transition-all duration-300 shadow-2xl rounded-2xl hover:scale-105 hover:shadow-purple-500/50"
          />
        </div>
      </div>
    </div>
  </section>
</template>
