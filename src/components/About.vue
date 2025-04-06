<script setup>
const features = [
  {
    title: 'Experiencia',
    description: 'Más de 20 años en el sector del pulido y restauración de suelos',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 14l9-5-9-5-9 5 9 5z"/>
      <path d="M12 14l9-5-9-5-9 5 9 5z"/>
      <path d="M12 21l9-5-9-5-9 5 9 5z"/>
    </svg>`
  },
  {
    title: 'Calidad',
    description: 'Utilizamos productos y maquinaria de primera calidad',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>`
  },
  {
    title: 'Garantía',
    description: 'Garantizamos la satisfacción en todos nuestros trabajos',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 12l2 2 4-4"/>
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>`
  }
]
</script>

<template>
  <section id="about" class="about section-wrapper">
    <div class="container">
      <h2 class="section-title">¿Por qué elegirnos?</h2>
      <p class="section-subtitle">Descubra las razones por las que somos su mejor opción</p>

      <div class="features">
        <div v-for="feature in features" 
             :key="feature.title" 
             class="feature">
          <div class="feature-icon" v-html="feature.icon"></div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background-color: var(--light-bg);
  padding: 4rem 0;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature {
  text-align: center;
  padding: 2rem;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
}

.feature-icon svg {
  width: 100%;
  height: 100%;
  stroke: var(--primary-color);
}

.feature h3 {
  color: var(--text-color);
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.feature p {
  color: var(--text-color-light);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature {
    padding: 1.5rem;
  }

  .feature-icon {
    width: 48px;
    height: 48px;
  }
}
</style> 