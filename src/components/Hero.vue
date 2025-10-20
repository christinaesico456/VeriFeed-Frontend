<template>
<section id="home" class="relative z-10 flex items-center justify-center w-full min-h-screen px-6 py-20 text-center snap-start">
  <div class="w-full max-w-5xl">
    <div class="pt-32"></div>
    
    <!-- Title -->
    <h1 class="mb-8 text-6xl font-extrabold md:text-8xl lg:text-9xl">
      <span class="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text drop-shadow-[0_5px_25px_rgba(59,130,246,0.6)]">
        VeriFeed
      </span>
    </h1>
    
    <!-- Subtitle -->
    <p class="max-w-3xl mx-auto mb-12 text-lg leading-relaxed text-gray-300 md:text-xl">
      Detect deepfakes with ease. VeriFeed uses advanced AI technology to keep your content authentic and your digital world safe.
    </p>
    
    <!-- CTA Buttons with scroll functionality -->
    <div class="flex flex-col justify-center gap-6 mb-20 sm:flex-row">
      <button
        @click="scrollToSection('about')"
        class="px-12 py-4 text-lg font-semibold text-white transition-all transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl"
      >
        Get Started
      </button>
      <button
        @click="scrollToSection('install')"
        class="px-12 py-4 text-lg font-semibold text-gray-900 transition-all transform bg-white rounded-full hover:bg-gray-100 hover:scale-105 hover:shadow-xl"
      >
        Install Now
      </button>
    </div>
    
    <!-- Phone Mockups -->
    <div class="flex items-center justify-center gap-10">
      <!-- Left phone -->
      <div class="relative transition-transform duration-500 transform rotate-12 hover:rotate-6">
        <div class="p-2 border border-gray-700 shadow-2xl w-44 h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl">
          <div class="relative w-full h-full overflow-hidden text-gray-100 bg-gray-900 rounded-2xl">
            <!-- Notch -->
            <div class="absolute w-20 h-1 transform -translate-x-1/2 bg-gray-700 rounded-full top-4 left-1/2"></div>
            
            <!-- Mock Deepfake Detection Feed -->
            <div class="h-full pt-6 overflow-y-auto text-left">
              <!-- Post 1 -->
              <div class="px-3 py-2 border-b border-gray-800">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-6 h-6 bg-gray-600 rounded-full"></div>
                  <div>
                    <p class="text-xs font-semibold">John Doe</p>
                    <p class="text-[10px] text-gray-400">2h ago</p>
                  </div>
                </div>
                <div class="relative w-full h-20 bg-gray-700 rounded-lg">
                  <span class="absolute bottom-1 right-1 px-2 py-[2px] text-[10px] font-bold rounded-full bg-green-500 text-white">
                    ✅ Real
                  </span>
                </div>
                <p class="mt-1 text-[11px] text-gray-400">AI verified: No deepfake detected.</p>
              </div>
              
              <!-- Post 2 -->
              <div class="px-3 py-2 border-b border-gray-800">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-6 h-6 bg-gray-600 rounded-full"></div>
                  <div>
                    <p class="text-xs font-semibold">Jane Smith</p>
                    <p class="text-[10px] text-gray-400">5h ago</p>
                  </div>
                </div>
                <div class="relative w-full h-20 bg-gray-700 rounded-lg">
                  <span class="absolute bottom-1 right-1 px-2 py-[2px] text-[10px] font-bold rounded-full bg-red-500 text-white">
                    ⚠️ Deepfake
                  </span>
                </div>
                <p class="mt-1 text-[11px] text-gray-400">AI flagged: Possible manipulated content.</p>
              </div>
              
              <!-- Post 3 -->
              <div class="px-3 py-2">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-6 h-6 bg-gray-600 rounded-full"></div>
                  <div>
                    <p class="text-xs font-semibold">AI News</p>
                    <p class="text-[10px] text-gray-400">1d ago</p>
                  </div>
                </div>
                <div class="relative w-full h-20 bg-gray-700 rounded-lg">
                  <span class="absolute bottom-1 right-1 px-2 py-[2px] text-[10px] font-bold rounded-full bg-yellow-500 text-gray-900 animate-pulse">
                    🔍 Checking...
                  </span>
                </div>
                <p class="mt-1 text-[11px] text-gray-400">Running AI detection on this video...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right phone -->
      <div class="relative transition-transform duration-500 transform -rotate-12 hover:-rotate-6">
        <div class="p-2 border border-gray-700 shadow-2xl w-44 h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl">
          <div class="relative flex items-center justify-center w-full h-full overflow-hidden bg-black rounded-2xl">
            <div class="absolute w-20 h-1 transform -translate-x-1/2 bg-gray-600 rounded-full top-4 left-1/2"></div>
            <div class="text-center">
              <span class="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">AI</span>
              <div class="mt-4 space-y-2">
                <div class="w-20 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                <div class="w-16 h-1 delay-100 bg-purple-500 rounded-full animate-pulse"></div>
                <div class="w-12 h-1 delay-200 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
function scrollToSection(sectionId, effect = 'smooth') {
  const section = document.getElementById(sectionId)
  if (!section) return
  
  // Apply transition effect based on type
  if (effect === 'fade') {
    // Fade effect
    section.style.transition = 'opacity 0.6s ease-in-out'
    section.style.opacity = '0'
    
    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    
    setTimeout(() => {
      section.style.opacity = '1'
    }, 300)
    
  } else if (effect === 'slide') {
    // Slide from right effect
    section.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease'
    section.style.transform = 'translateX(100px)'
    section.style.opacity = '0'
    
    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    
    setTimeout(() => {
      section.style.transform = 'translateX(0)'
      section.style.opacity = '1'
    }, 400)
    
  } else if (effect === 'zoom') {
    // Zoom effect
    section.style.transition = 'transform 0.7s ease-out, opacity 0.7s ease'
    section.style.transform = 'scale(0.8)'
    section.style.opacity = '0'
    
    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    
    setTimeout(() => {
      section.style.transform = 'scale(1)'
      section.style.opacity = '1'
    }, 300)
    
  } else {
    // Default smooth scroll
    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>