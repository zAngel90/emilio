<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const scrollToContact = () => {
  const contactSection = document.getElementById('contacto')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push('/#contacto')
  }
}

const services = [
  {
    title: 'Pulido de Mármol',
    description: 'Restauramos el brillo y la belleza natural de sus suelos de mármol.',
    icon: '◆',
    features: ['Acabado brillante', 'Eliminación de rayones', 'Protección duradera']
  },
  {
    title: 'Pulido de Terrazo',
    description: 'Devolvemos la vida a sus suelos de terrazo, eliminando rayones y desgaste.',
    icon: '■',
    features: ['Restauración completa', 'Brillo natural', 'Máxima resistencia']
  },
  {
    title: 'Cristalizado',
    description: 'Aplicamos tratamientos de cristalizado para un brillo duradero.',
    icon: '●',
    features: ['Alto brillo', 'Protección superior', 'Mantenimiento fácil']
  },
  {
    title: 'Piedra Natural',
    description: 'Recuperamos la belleza original de todo tipo de piedra natural.',
    icon: '▲',
    features: ['Limpieza profunda', 'Sellado protector', 'Acabado premium']
  }
]
</script>

<template>
  <section class="section-wrapper services-section" id="servicios">
    <div class="services">
      <div class="container">
        <h2 class="section-title">Nuestros Servicios</h2>
        <p class="section-subtitle">Soluciones profesionales para todo tipo de suelos</p>
        
        <div class="services-grid">
          <div v-for="service in services" 
               :key="service.title" 
               class="service-card">
            <div class="service-header">
              <span class="service-icon">{{ service.icon }}</span>
              <h3>{{ service.title }}</h3>
            </div>
            <p class="service-description">{{ service.description }}</p>
            <ul class="service-features">
              <li v-for="feature in service.features" 
                  :key="feature">
                <span class="feature-bullet">•</span>
                {{ feature }}
              </li>
            </ul>
            <button class="service-action" @click="scrollToContact">
              Solicitar Presupuesto
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  background-color: var(--light-bg);
}

.services {
  padding: 4rem 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.service-card {
  background-color: var(--white);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--primary-color);
  opacity: 0.8;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.service-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.service-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
  background: rgba(var(--primary-color-rgb), 0.1);
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.service-card h3 {
  font-size: 1.25rem;
  color: var(--text-color);
  font-weight: 600;
  margin: 0;
}

.service-description {
  color: var(--text-color);
  line-height: 1.5;
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
  opacity: 0.85;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.feature-bullet {
  color: var(--primary-color);
  font-size: 1.2rem;
}

.service-action {
  margin-top: auto;
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.service-action:hover {
  background-color: var(--primary-color);
  color: white;
}

@media (max-width: 768px) {
  .services {
    padding: 3rem 0;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .service-card {
    padding: 1.25rem;
  }

  .service-icon {
    font-size: 1.25rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  .service-card h3 {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style> 