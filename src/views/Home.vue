<script setup>
import Hero from '../components/Hero.vue'
import Services from '../components/Services.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'
import HomeGallery from '../components/HomeGallery.vue'
import PaymentOverlay from '../components/PaymentOverlay.vue'
</script>

<template>
  <div class="home">
    <PaymentOverlay />
    <Hero />
    <HomeGallery />
    <Services />
    <Contact />
  </div>
</template>

<style scoped>
.home {
  position: relative;
}
</style> 