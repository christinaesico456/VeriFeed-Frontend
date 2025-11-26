<template> 
  <section
    id="sneakpeek"
    class="flex flex-col items-center justify-center w-full min-h-screen px-6 snap-start"
  >
    <!-- Label -->
    <div
      class="inline-block px-4 py-1 mb-4 text-sm rounded-full bg-slate-800 text-white/90"
    >
      Demo Video
    </div>

    <!-- Title -->
    <h2
      class="mb-8 text-3xl font-extrabold text-center text-white md:text-5xl"
    >
      See VeriFeed in Action
    </h2>

    <!-- Video Player -->
    <div
      class="relative w-full max-w-3xl h-[45vh] overflow-hidden rounded-2xl shadow-lg"
    >
      <video
        controls
        autoplay
        muted
        playsinline
        class="object-cover w-full h-full bg-black rounded-2xl"
      >
        <!-- Main Video -->
        <source src="/VeriFeed Demo.mp4" type="video/mp4" />
        Your browser does not support video playback.
      </video>
    </div>

    <!-- Description -->
    <p class="max-w-2xl mt-6 text-base text-center text-white/70">
      A quick look at how VeriFeed works — simple, fast, and effective.
    </p>
  </section>
</template>
