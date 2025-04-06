<script setup>
// Component logic here
</script>

<template>
  <section class="hero" id="inicio">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-text">
        <h1>Expertos en pulido y tratamientos de suelos</h1>
        <h2>HORMIGÓN, MÁRMOL Y TERRAZOS</h2>
        <p class="description">Transformamos y renovamos sus superficies con precisión y excelencia</p>
        <div class="cta-buttons">
          <a href="#contacto" class="cta-button primary">Solicitar Presupuesto</a>
          <a href="#servicios" class="cta-button secondary">Ver Servicios</a>
        </div>
        <div class="hero-badge">
          <div class="badge-content">
            <span class="years">20</span>
            <span class="text">Años de<br>Experiencia</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  min-height: 100vh;
  background: url('https://i.postimg.cc/Vk02hDw4/IMAGEN-PULIDO-Y-ABRILLANTADO-DE-MARMOL-CREMA.jpg') center/cover;
  display: flex;
  align-items: flex-start;
  color: white;
  position: relative;
  padding-top: calc(var(--navbar-height));
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: var(--dark-overlay);
}

.hero-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  position: relative;
  z-index: 1;
}

.hero-text {
  max-width: 800px;
  padding-top: 4rem;
}

.hero-text h1 {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  line-height: 1.1;
  color: var(--primary-color);
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-text h2 {
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: white;
  text-transform: uppercase;
}

.hero-description {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-style: italic;
  line-height: 1.4;
}

.hero-badge {
  width: 150px;
  height: 150px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.badge-content {
  text-align: center;
  color: var(--secondary-color);
}

.badge-content .years {
  font-size: 3rem;
  font-weight: 700;
  display: block;
  line-height: 1;
}

.badge-content .text {
  font-size: 1rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .hero {
    min-height: calc(100vh - 60px);
    margin-top: 0;
    padding-top: calc(var(--navbar-height) - 1rem);
  }

  .hero-content {
    padding: 1rem;
  }

  .hero-text {
    padding-top: 2rem;
  }

  .hero-text h1 {
    font-size: 2.5rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .hero-text h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  .hero-description {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .hero-badge {
    width: 120px;
    height: 120px;
    margin-top: 1.5rem;
  }

  .badge-content .years {
    font-size: 2.5rem;
  }

  .badge-content .text {
    font-size: 0.9rem;
  }
}
</style> 