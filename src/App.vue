<template>
  <div id="app" class="relative min-h-screen bg-center bg-no-repeat bg-cover">
    <!-- Overlay -->
    <div class="absolute inset-0 z-0 bg-black/60"></div>

    <!-- Main content -->
    <div class="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory">
      <Layout>
        <section id="home" class="flex items-center justify-center min-h-screen snap-start section">
          <Hero />
        </section>

        <section id="about" class="flex items-center justify-center min-h-screen snap-start section">
          <About />
        </section>

        <section id="features" class="flex items-center justify-center min-h-screen snap-start section">
          <Features />
        </section>

        <section id="how" class="flex items-center justify-center min-h-screen snap-start section">
          <HowItWorks />
        </section>

        <section id="sneakpeek" class="flex items-center justify-center min-h-screen snap-start section">
          <Video />
        </section>

        <section id="install" class="flex items-center justify-center min-h-screen snap-start section">
          <Install />
        </section>

        <section id="faq" class="flex items-center justify-center min-h-screen snap-start section">
          <FAQ />
        </section>

        <section id="contacts" class="flex items-center justify-center min-h-screen snap-start section">
          <Contacts @open-feedback="showFeedbackModal = true" />
        </section>

        <section id="feedback" class="flex items-center justify-center min-h-screen snap-start section">
          <FeedbackList :refresh="feedbackRefreshKey" />
        </section>
      </Layout>
    </div>

    <!-- Feedback Modal -->
    <FeedbackModal
      v-if="showFeedbackModal"
      @close="showFeedbackModal = false"
      @submitted="refreshFeedbackList"
    />
  </div>
</template>

<script>
import Layout from './components/Layout.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Features from './components/Features.vue'
import HowItWorks from './components/HowItWorks.vue'
import Video from './components/Video.vue'
import Install from './components/Install.vue'
import FAQ from './components/FAQ.vue'
import Contacts from './components/Contacts.vue'
import FeedbackModal from './components/FeedbackModal.vue'
import FeedbackList from './components/FeedbackList.vue'

export default {
  name: 'App',
  components: {
    Layout,
    Hero,
    About,
    Features,
    HowItWorks,
    Video,
    Install,
    FAQ,
    Contacts,
    FeedbackModal,
    FeedbackList
  },
  data() {
    return {
      showFeedbackModal: false,
      feedbackRefreshKey: 0
    }
  },
  methods: {
    refreshFeedbackList() {
      this.feedbackRefreshKey++
      this.showFeedbackModal = false
    }
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in")
          } else {
            entry.target.classList.remove("fade-in")
          }
        })
      },
      { threshold: 0.3 }
    )

    document.querySelectorAll(".section").forEach((sec) => {
      observer.observe(sec)
    })
  }
}
</script>

<style>
#app {
  background-image: url('/VeriFeed-BG.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  scroll-behavior: smooth;
  min-height: 100vh;
  overflow-x: hidden;
}

.section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.section.fade-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
