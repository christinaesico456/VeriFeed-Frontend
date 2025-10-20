<template>
  <section id="about" class="flex items-center justify-center w-full min-h-screen snap-start">
    <div class="max-w-6xl px-6 mx-auto">
      <div class="mb-12 text-center">
        <div class="inline-block px-4 py-1 rounded-full bg-slate-800 text-white/90">Features & Functions</div>
        <h2 class="mt-6 text-3xl font-extrabold text-white md:text-4xl drop-shadow-lg">Why VeriFeed?</h2>
        <p class="max-w-2xl mx-auto mt-3 text-white/80">
          Discover the key tools that make VeriFeed the most reliable deepfake detection system available.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Smart Deepfake Detection -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-tr from-[#6EE7B7] via-[#3B82F6] to-[#8B5CF6] shadow-md shadow-blue-500/30">
            <MagnifyingGlassIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">Smart Deepfake Detection</h3>
          <p class="text-sm text-white/80">VeriFeed uses advanced AI to check videos for signs of manipulation.</p>
        </div>

        <!-- Facebook Integration -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] shadow-md shadow-indigo-500/30">
            <DevicePhoneMobileIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">Facebook Integration</h3>
          <p class="text-sm text-white/80">Created as a browser extension, works directly on Facebook, scanning videos in real time as users scroll.</p>
        </div>

        <!-- Real-Time Analysis -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] shadow-md shadow-pink-500/30">
            <BoltIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">Real-Time Analysis</h3>
          <p class="text-sm text-white/80">Instant results with easy-to-read authenticity scores.</p>
        </div>

        <!-- Privacy and Security First -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-tr from-[#14B8A6] to-[#3B82F6] shadow-md shadow-cyan-500/30">
            <ShieldCheckIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">Privacy and Security First</h3>
          <p class="text-sm text-white/80">Runs locally on your browser with no uploads, keeping your data safe and private.</p>
        </div>

        <!-- User-Friendly Interface -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-tr from-[#6366F1] to-[#EC4899] shadow-md shadow-purple-500/30">
            <UserCircleIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">User-Friendly Interface</h3>
          <p class="text-sm text-white/80">Clean, simple, and accessible design for everyone.</p>
        </div>

        <!-- Insightful Results -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-tr from-[#3B82F6] to-[#EC4899] shadow-md shadow-pink-400/30">
            <ChartBarIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">Insightful Results</h3>
          <p class="text-sm text-white/80">Shows simple reports that help users understand deepfake activity.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  MagnifyingGlassIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  ChartBarIcon
} from "@heroicons/vue/24/solid"
</script>
