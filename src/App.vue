<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CookieBanner from './components/CookieBanner.vue'
</script>

<template>
  <Navbar />
  <CookieBanner />
  <router-view></router-view>
  <Footer />
</template>

<style>
:root {
  --primary-color: #FFD700;
  --secondary-color: #333333;
  --text-color: #333333;
  --light-bg: #f5f5f5;
  --white: #ffffff;
  --dark-overlay: rgba(0, 0, 0, 0.5);
  --navbar-height: 96px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
}

a {
  color: inherit;
  text-decoration: none;
}

.router-link-active {
  color: var(--primary-color) !important;
}

.router-link-exact-active {
  color: var(--primary-color) !important;
}

.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-wrapper {
  width: 100%;
}

.section-title {
  font-size: 2.5rem;
  color: var(--secondary-color);
  text-align: center;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 3rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
}
</style>
