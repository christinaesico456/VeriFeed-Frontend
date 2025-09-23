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
        <!-- Feature card -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-white/10">
            <MagnifyingGlassIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">Advanced Detection</h3>
          <p class="text-sm text-white/80">AI-powered system trained on millions of samples for maximum accuracy.</p>
        </div>

        <!-- Feature card -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-white/10">
            <DevicePhoneMobileIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">Cross-Platform</h3>
          <p class="text-sm text-white/80">Works seamlessly across web apps, mobile, and browser extensions.</p>
        </div>

        <!-- Feature card -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-white/10">
            <BoltIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">Real-Time Analysis</h3>
          <p class="text-sm text-white/80">Instant results with easy-to-read authenticity scores.</p>
        </div>

        <!-- Feature card -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-white/10">
            <ShieldCheckIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">Secure Integration</h3>
          <p class="text-sm text-white/80">Protects data with end-to-end encryption across all platforms.</p>
        </div>

        <!-- Feature card -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-white/10">
            <UserCircleIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">User-Friendly Interface</h3>
          <p class="text-sm text-white/80">Clean, simple, and accessible design for everyone.</p>
        </div>

        <!-- New Feature card -->
        <div class="p-8 text-white transition-transform shadow-lg bg-vf-navy rounded-3xl hover:scale-105">
          <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-white/10">
            <ChartBarIcon class="w-6 h-6 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">Detailed Reporting</h3>
          <p class="text-sm text-white/80">Comprehensive insights and exportable reports for informed decisions.</p>
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
