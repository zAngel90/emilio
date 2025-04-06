<script setup>
const projects = [
  {
    title: 'Restauración Hotel Plaza',
    description: 'Pulido y cristalizado de 1500m² de mármol en zonas comunes',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Comercial'
  },
  {
    title: 'Villa Mediterránea',
    description: 'Recuperación de suelos de terrazo en residencia privada',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Residencial'
  },
  {
    title: 'Centro Comercial Luna',
    description: 'Mantenimiento y pulido de suelos de gran tránsito',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Comercial'
  },
  {
    title: 'Residencial Los Pinos',
    description: 'Restauración completa de suelos en zonas comunes',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Residencial'
  }
]
</script>

<template>
  <section class="section-wrapper portfolio-section" id="portfolio">
    <div class="portfolio">
      <div class="container">
        <h2 class="section-title">Nuestros Trabajos</h2>
        <p class="section-subtitle">Descubra algunos de nuestros proyectos más destacados</p>

        <div class="portfolio-grid">
          <div v-for="project in projects" :key="project.title" class="portfolio-card">
            <div class="portfolio-image">
              <img :src="project.image" :alt="project.title">
              <div class="portfolio-overlay">
                <span class="category">{{ project.category }}</span>
              </div>
            </div>
            <div class="portfolio-content">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio-section {
  background-color: var(--white);
}

.portfolio {
  padding: 6rem 0;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.portfolio-card {
  background-color: var(--white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.portfolio-card:hover {
  transform: translateY(-5px);
}

.portfolio-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.portfolio-card:hover .portfolio-image img {
  transform: scale(1.1);
}

.portfolio-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: var(--secondary-color);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
}

.portfolio-content {
  padding: 1.5rem;
}

.portfolio-content h3 {
  font-size: 1.3rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.portfolio-content p {
  color: var(--text-color);
  font-size: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .portfolio {
    padding: 4rem 0;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }
}
</style> 