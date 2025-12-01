<template>
  <section
    id="install"
    class="flex items-center justify-center w-full min-h-screen bg-transparent"
  >
    <div
      class="relative w-full max-w-6xl p-10 mx-auto border border-slate-700/50 rounded-2xl"
    >
      <!-- Top Install Badge -->
      <div class="absolute -translate-x-1/2 -top-20 left-1/2">
        <div
          class="inline-block px-4 py-1 text-sm border rounded-full shadow-lg bg-slate-800/80 text-white/90 backdrop-blur-sm border-slate-600/40"
        >
          Install Now
        </div>
      </div>

      <!-- Post Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <img
            src="/profile_placeholder.png"
            alt="Profile"
            class="object-cover w-12 h-12 border rounded-full border-slate-600/50"
          />
          <div>
            <p class="flex items-center gap-1 text-lg font-semibold text-white">
              Facebook User
              <span class="text-blue-500">✔️</span>
            </p>
            <p class="text-sm text-gray-400">Sponsored · Just now</p>
          </div>
        </div>
        <button class="text-xl text-gray-400 hover:text-white">⋮</button>
      </div>

      <!-- Post Text -->
      <p class="mb-6 text-lg leading-relaxed text-gray-200 md:text-xl">
        🔒 Keep your Facebook feed safe.<br />
        VeriFeed filters out fake news and harmful content directly in your feed.
      </p>

      <!-- Link Preview - Microsoft Edge -->
      <div
        class="flex items-center justify-between w-full p-6 mb-4 transition border rounded-lg border-slate-700 bg-slate-900/20 hover:bg-slate-900/30"
      >
        <div class="flex items-center gap-6">
          <img src="/Microsoft.png" alt="Microsoft Edge" class="w-14 h-14" />
          <div>
            <p class="text-lg font-semibold text-white">VeriFeed for Microsoft Edge</p>
            <p class="text-sm text-gray-400">Available on Microsoft Edge Add-ons</p>
          </div>
        </div>

        <!-- Button with Modal Trigger -->
        <button
          @click="openModal('edge')"
          class="relative px-8 py-3 overflow-hidden text-sm font-semibold text-white transition-transform duration-300 rounded-full hover:scale-110 animate-popPulse"
        >
          <!-- Deep aurora gradient -->
          <span
            class="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#1e3a8a,#4c1d95,#7e22ce,#9d174d)] bg-[length:300%_300%] animate-gradientFlow"
          ></span>

          <!-- Soft shimmer overlay -->
          <span
            class="absolute inset-0 bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-shimmer rounded-full"
          ></span>

          <!-- Ambient glow -->
          <span
            class="absolute inset-0 rounded-full opacity-40 blur-xl bg-[radial-gradient(circle,rgba(147,51,234,0.25),transparent_70%)] animate-pulseGlow"
          ></span>

          <!-- Text -->
          <span class="relative z-10 tracking-wide drop-shadow-[0_4px_20px_rgba(147,51,234,0.5)]">
            Get VeriFeed Now!
          </span>
        </button>
      </div>

      <!-- Link Preview - Chrome Web Store -->
      <div
        class="flex items-center justify-between w-full p-6 transition border rounded-lg border-slate-700 bg-slate-900/20 hover:bg-slate-900/30"
      >
        <div class="flex items-center gap-6">
          <img src="/Google_icon.png" alt="Google Chrome" class="w-14 h-14" />
          <div>
            <p class="text-lg font-semibold text-white">VeriFeed for Google Chrome</p>
            <p class="text-sm text-gray-400">Available on Chrome Web Store</p>
          </div>
        </div>

        <!-- Button with Modal Trigger -->
        <button
          @click="openModal('chrome')"
          class="relative px-8 py-3 overflow-hidden text-sm font-semibold text-white transition-transform duration-300 rounded-full hover:scale-110 animate-popPulse"
        >
          <!-- Deep aurora gradient -->
          <span
            class="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#1e3a8a,#4c1d95,#7e22ce,#9d174d)] bg-[length:300%_300%] animate-gradientFlow"
          ></span>

          <!-- Soft shimmer overlay -->
          <span
            class="absolute inset-0 bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-shimmer rounded-full"
          ></span>

          <!-- Ambient glow -->
          <span
            class="absolute inset-0 rounded-full opacity-40 blur-xl bg-[radial-gradient(circle,rgba(147,51,234,0.25),transparent_70%)] animate-pulseGlow"
          ></span>

          <!-- Text -->
          <span class="relative z-10 tracking-wide drop-shadow-[0_4px_20px_rgba(147,51,234,0.5)]">
            Get VeriFeed Now!
          </span>
        </button>
      </div>

      <!-- Reactions -->
      <div class="flex items-center justify-between mt-4 text-sm text-gray-400">
        <div class="flex items-center gap-2">
          <div class="flex -space-x-1">
            <span
              class="flex items-center justify-center w-5 h-5 text-xs text-white bg-blue-500 rounded-full"
              >👍</span
            >
            <span
              class="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full"
              >❤️</span
            >
            <span
              class="flex items-center justify-center w-5 h-5 text-xs text-white bg-yellow-400 rounded-full"
              >😮</span
            >
          </div>
          <span>1.2k</span>
        </div>
        <p>320 Comments · 89 Shares</p>
      </div>

      <div class="my-4 border-t border-slate-700"></div>

      <!-- Action Bar -->
      <div class="flex justify-around text-sm text-gray-400">
        <button class="flex items-center gap-2 hover:text-white">👍 Like</button>
        <button class="flex items-center gap-2 hover:text-white">
          💬 Comment
        </button>
        <button class="flex items-center gap-2 hover:text-white">
          ↪️ Share
        </button>
      </div>
    </div>

    <!-- Terms & Conditions Modal -->
    <Transition name="modal-fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xl bg-black/40"
        @click.self="showModal = false"
      >
        <!-- Modal Container -->
        <div
          class="relative z-10 w-full max-w-md p-8 border shadow-2xl modal-content bg-slate-900/90 backdrop-blur-2xl rounded-2xl border-slate-700/50"
        >
          <!-- Modal Header -->
          <div class="mb-6 text-center">
            <h2 class="text-2xl font-bold text-white">Terms & Conditions</h2>
          </div>

          <!-- Modal Content -->
          <div class="mb-8 text-left">
            <p class="text-base leading-relaxed text-gray-300">
              By installing <span class="font-semibold text-white">VeriFeed</span>, you agree to our 
              <button
                type="button"
                @click="showUserAgreement = true"
                class="p-0 text-blue-400 underline transition-colors bg-transparent border-0 cursor-pointer hover:text-blue-300 font-inherit"
              >
                user agreement
              </button>
              and Privacy Policy.
            </p>
            <p class="mt-4 text-sm text-gray-400">
              We are committed to protecting your privacy and ensuring a safe browsing experience.
            </p>
            
            <!-- Checkbox Agreement with visible checkmark -->
            <label class="flex items-start gap-3 p-4 mt-6 transition-colors border cursor-pointer rounded-xl border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600">
              <div class="relative flex-shrink-0">
                <input
                  type="checkbox"
                  v-model="hasAgreed"
                  class="w-5 h-5 mt-0.5 transition-colors border-2 rounded cursor-pointer appearance-none border-slate-600 bg-slate-900 checked:bg-gradient-to-br checked:from-blue-600 checked:to-purple-600 checked:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <!-- Visible Checkmark -->
                <svg
                  v-if="hasAgreed"
                  class="absolute w-3.5 h-3.5 text-white pointer-events-none top-1 left-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <span class="flex-1 text-sm leading-relaxed text-gray-300">
                I have read and agree to the VeriFeed user agreement.
              </span>
            </label>
          </div>

          <!-- Modal Actions -->
          <div class="flex justify-center">
            <!-- Get VeriFeed Now Button -->
            <button
              @click="handleAgree"
              :disabled="!hasAgreed"
              :class="[
                'relative px-10 py-3.5 overflow-hidden text-sm font-semibold text-white transition-all duration-200 rounded-full',
                hasAgreed ? 'hover:scale-115 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              ]"
            >
              <!-- Gradient Background -->
              <span
                class="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#1e3a8a,#4c1d95,#7e22ce,#9d174d)] bg-[length:300%_300%] animate-gradientFlow"
              ></span>

              <!-- Soft shimmer overlay -->
              <span
                class="absolute inset-0 bg-[linear-gradient(100deg,transparent_20%,rgba(255,255,255,0.1)_100%,transparent_100%)] animate-shimmer rounded-full"
              ></span>

              <!-- Ambient glow -->
              <span
                v-if="hasAgreed"
                class="absolute inset-0 rounded-full opacity-40 blur-xl bg-[radial-gradient(circle,rgba(147,51,234,0.25),transparent_70%)] animate-pulseGlow"
              ></span>

              <!-- Text -->
              <span class="relative z-10 tracking-wide">Get VeriFeed Now</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- User Agreement Modal -->
    <Transition name="modal-fade">
      <div
        v-if="showUserAgreement"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto"
        @click.self="showUserAgreement = false"
      >
        <!-- Enhanced Backdrop with Blur -->
        <div class="absolute inset-0 backdrop-blur-xl bg-black/50"></div>

        <!-- Agreement Modal Container -->
        <div
          class="modal-content relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 border shadow-2xl bg-slate-900/90 backdrop-blur-2xl rounded-2xl border-slate-700/50 light-scrollbar"
        >
          <h2 class="mb-6 text-2xl font-bold text-center text-white">
            VeriFeed User Agreement
          </h2>

          <div class="space-y-4 text-sm leading-relaxed text-gray-300">
            <p>
              Welcome to <strong class="text-white">VeriFeed</strong> — a browser extension developed to detect and alert users about potential deepfake videos on Facebook in real time. By using VeriFeed, you agree to abide by the following terms.
            </p>

            <p>
              <strong class="text-white">1. Purpose:</strong> VeriFeed is designed as a research-based tool to promote digital literacy and safeguard users from manipulated media. It analyzes video frames locally on your browser using advanced deep learning models (ResNeXt50 combined with Long Short-Term Memory) and does not store or transmit personal data.
            </p>

            <p>
              <strong class="text-white">2. Data Privacy:</strong> VeriFeed strictly complies with privacy standards and does not collect any personal information or browsing history. All detection processes occur client-side, meaning your analyzed data stays within your device. We do not share, sell, or transmit your data to third parties.
            </p>

            <p>
              <strong class="text-white">3. Accuracy and Limitations:</strong> While VeriFeed strives to detect deepfakes accurately, no detection system is 100% perfect. False positives and false negatives may occur, especially with heavily compressed videos, low-resolution content, or novel deepfake techniques. Results should be treated as advisory and users are encouraged to verify content through additional trusted sources.
            </p>

            <p>
              <strong class="text-white">4. Scope Limitations:</strong> VeriFeed is specifically designed for video deepfake detection on Facebook and does not analyze static images, audio-only deepfakes, text-based misinformation, or the semantic meaning of content. The extension identifies technical manipulation patterns but does not evaluate whether content constitutes fake news, propaganda, or satire.
            </p>

            <p>
              <strong class="text-white">5. User Responsibility:</strong> Users agree to use VeriFeed ethically and lawfully. You must not attempt to reverse engineer, modify, redistribute, or exploit the tool for malicious purposes. VeriFeed must be used solely for informational, educational, and personal purposes in compliance with Facebook's Terms of Service and applicable laws.
            </p>

            <p>
              <strong class="text-white">6. Browser Permissions:</strong> VeriFeed requires minimal browser permissions to function: access to Facebook pages for video frame extraction and analysis, and permission to display detection alerts. The extension does not require access to passwords, cookies, or sensitive authentication data.
            </p>

            <p>
              <strong class="text-white">7. Ethical AI Principles:</strong> VeriFeed is developed in accordance with UNESCO's AI ethical framework, ensuring transparency in detection processes, fairness and non-discrimination in analysis, accountability and traceability of decisions, respect for human rights and data privacy, and contribution to societal well-being.
            </p>

            <p>
              <strong class="text-white">8. Updates & Modifications:</strong> VeriFeed may be updated periodically to improve detection accuracy, add features, ensure browser compatibility, or address security vulnerabilities. Updates will be delivered through your browser's automatic extension update mechanism. We reserve the right to modify this User Agreement with notice to users.
            </p>

            <p>
              <strong class="text-white">9. Intellectual Property:</strong> VeriFeed and all related documentation are protected under copyright law. Unauthorized use, reproduction, or distribution without consent is prohibited.
            </p>

            <p>
              <strong class="text-white">10. Disclaimer & Limitation of Liability:</strong> VeriFeed is provided "as is" without warranties of any kind, express or implied. The developers shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use or inability to use the extension, including but not limited to reliance on detection results, missed deepfakes, false positive alerts, or actions taken based on extension recommendations.
            </p>

            <p>
              <strong class="text-white">11. Contribution to Global Goals:</strong> VeriFeed contributes to the United Nations Sustainable Development Goals (SDGs), specifically SDG 9 (Industry, Innovation, and Infrastructure) by creating innovative technological solutions to enhance digital infrastructure resilience, and SDG 16 (Peace, Justice, and Strong Institutions) by promoting transparent, accountable information systems that combat misinformation and strengthen public trust in digital media.
            </p>

            <p>
              <strong class="text-white">12. Research Acknowledgment:</strong> This research project is conducted by Angel Vhea P. Melindo, Princess Gwenn A. Destura, and Christina M. Esico as part of S-CSSE321 Software Engineering 1 (BCS32). VeriFeed represents an academic contribution to addressing the critical challenge of deepfake proliferation on social media platforms, with particular focus on the Philippine context where deepfake cases increased by 4,500% between 2022 and 2023.
            </p>

            <p>
              <strong class="text-white">13. Contact & Support:</strong> For technical support, feedback, bug reports, or questions regarding this User Agreement, please contact the VeriFeed development team through the extension's support channels, your educational institution's Computer Science department, or official VeriFeed communication channels as provided upon installation.
            </p>

            <p class="pt-4 mt-4 text-xs text-gray-400 border-t border-slate-700">
              <strong>Effective Date:</strong> November 2024<br>
              <strong>Last Updated:</strong> November 2024<br>
              <strong>Version:</strong> 1.0
            </p>
          </div>

          <div class="flex justify-center mt-6">
            <button
              @click="showUserAgreement = false"
              class="relative px-8 py-3 overflow-hidden text-sm font-semibold text-white transition-all duration-200 rounded-full hover:scale-105"
            >
              <span class="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#1e3a8a,#4c1d95,#7e22ce,#9d174d)]"></span>
              <span class="relative z-10">Close</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';

// for modal visibility
const showModal = ref(false);

// for user agreement modal
const showUserAgreement = ref(false);

// for checkbox agreement
const hasAgreed = ref(false);

// track which browser was selected
const selectedBrowser = ref('');

// Browser store URLs
const edgeStoreUrl = 'https://microsoftedge.microsoft.com/addons/detail/pjebiibiippeffhmimailefekjgcbgbm';
const chromeStoreUrl = 'https://chromewebstore.google.com/detail/verifeed-deepfake-video-d/achegfhedagpghgdjdaijklhpnhjcllj';

// Prevent body scroll when modal is open
watch([showModal, showUserAgreement], ([modal, agreement]) => {
  if (modal || agreement) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Open modal with browser selection
const openModal = (browser) => {
  selectedBrowser.value = browser;
  showModal.value = true;
};

// Handle agree action
const handleAgree = () => {
  if (!hasAgreed.value) return; 
  showModal.value = false;
  hasAgreed.value = false; 
  
  const storeUrl = selectedBrowser.value === 'edge' ? edgeStoreUrl : chromeStoreUrl;
  window.open(storeUrl, '_blank');
};
</script>

<style scoped>
/* flowing gradient animation */
@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradientFlow {
  background-size: 300% 300%;
  animation: gradientFlow 5.5s ease-in-out infinite;
}

/* shimmer movement */
@keyframes shimmerMove {
  0% { background-position: -150% 0; }
  100% { background-position: 150% 0; }
}
.animate-shimmer {
  background-size: 200% 100%;
  animation: shimmerMove 3s linear infinite;
  mix-blend-mode: overlay;
}

/* breathing glow */
@keyframes pulseGlow {
  0%, 100% { opacity: 0.25; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.08); }
}
.animate-pulseGlow {
  animation: pulseGlow 3.8s ease-in-out infinite;
}

/* popping pulse */
@keyframes popPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
}
.animate-popPulse {
  animation: popPulse 2.8s ease-in-out infinite;
}

/* Modal fade animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content {
  animation: modalSlideUp 0.3s ease-out;
}

@keyframes modalSlideUp {
  from {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Custom scrollbar for user agreement */
.light-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.light-scrollbar::-webkit-scrollbar-track {
  background: rgba(51, 65, 85, 0.3);
  border-radius: 5px;
}

.light-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 5px;
}

.light-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}
</style>