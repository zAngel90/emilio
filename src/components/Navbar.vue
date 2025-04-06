<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const scrollToSection = async (sectionId) => {
  isMenuOpen.value = false
  
  // Si no estamos en la página principal, primero navegamos a ella
  if (router.currentRoute.value.path !== '/') {
    await router.push('/')
  }
  
  // Esperamos un momento para asegurar que los componentes se han montado
  setTimeout(() => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, 100)
}
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo" @click="scrollToSection('')">
          <div class="logo-shape">
            <span class="company-name">Emilio Osado</span>
            <span class="company-service">Pulidos y Tratamientos</span>
          </div>
        </router-link>

        <button class="menu-toggle" @click="toggleMenu" :class="{ active: isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="nav-links" :class="{ active: isMenuOpen }">
          <a href="#" @click.prevent="scrollToSection('')">Inicio</a>
          <a href="#servicios" @click.prevent="scrollToSection('servicios')">Servicios</a>
          <router-link to="/galeria" @click="isMenuOpen = false">Galería</router-link>
          <a href="#sobre-nosotros" @click.prevent="scrollToSection('sobre-nosotros')">Sobre Nosotros</a>
          <a href="#contacto" @click.prevent="scrollToSection('contacto')" class="contact-link">Contacto</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 80px;
}

.navbar {
  background: white;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo {
  text-decoration: none;
  cursor: pointer;
}

.logo:hover {
  opacity: 0.9;
}

.logo-shape {
  background: var(--primary-color);
  padding: 0.75rem 2rem;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
  text-align: center;
  transform: translateY(-0.5rem);
}

.company-name {
  display: block;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: #333;
  letter-spacing: 2px;
  margin-bottom: 0.1rem;
  line-height: 1;
}

.company-service {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s ease;
  padding: 0.5rem 1rem;
}

.nav-links a:hover {
  opacity: 0.7;
}

.nav-links a.router-link-exact-active {
  font-weight: 700;
  color: var(--primary-color);
}

.menu-toggle {
  display: none;
}

.contact-link {
  background-color: var(--primary-color);
  color: white !important;
  padding: 0.5rem 1.5rem !important;
  border-radius: 4px;
  transition: all 0.3s ease !important;
}

.contact-link:hover {
  background-color: var(--primary-color-dark, #1a3c7d);
  opacity: 1 !important;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .header {
    height: 60px;
  }

  .navbar {
    height: 60px;
  }

  .nav-container {
    padding: 0 1rem;
    position: relative;
  }

  .logo-shape {
    padding: 0.5rem 1rem;
    transform: none;
  }

  .company-name {
    font-size: 1.2rem;
  }

  .company-service {
    font-size: 0.6rem;
  }

  .nav-links {
    position: fixed;
    top: 60px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 60px);
    background: white;
    flex-direction: column;
    padding: 2rem 1rem;
    padding-top: 3rem;
    transition: left 0.3s ease;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    z-index: 900;
  }

  .nav-links.active {
    left: 0;
  }

  .nav-links a {
    padding: 1rem 0;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #eee;
    font-size: 1.1rem;
  }

  .nav-links a:last-child {
    border-bottom: none;
  }

  .menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    margin-left: auto;
    z-index: 1000;
  }

  .menu-toggle span {
    display: block;
    width: 24px;
    height: 2px;
    margin: 2px 0;
    background-color: var(--text-color);
    transition: all 0.3s ease;
  }

  .menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  .contact-link {
    background-color: var(--primary-color);
    margin: 1rem auto;
    width: 80% !important;
  }
}
</style> 