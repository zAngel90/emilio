<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const handleSubmit = () => {
  // Aquí iría la lógica para enviar el formulario
  console.log('Form submitted:', form.value)
}
</script>

<template>
  <section class="section-wrapper contact-section" id="contacto">
    <div class="container">
      <h2 class="section-title">Contacto</h2>
      <p class="section-subtitle">Solicite su presupuesto sin compromiso</p>

      <div class="contact-container">
        <div class="contact-card">
          <div class="contact-info">
            <svg class="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <h3>Llámenos ahora</h3>
            <a href="tel:665402571" class="phone-number">665 402 571</a>
            <div class="schedule">
              <p>
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                Lunes - Sábado: 8:00 - 16:00
              </p>
              <p>
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
                <a href="mailto:emilioosado@hotmail.com">emilioosado@hotmail.com</a>
              </p>
            </div>
            <p class="service-area">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Servicio en toda la provincia de Cádiz y alrededores
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background-color: var(--light-bg);
  padding: 6rem 0;
}

.contact-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}

.contact-card {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
  transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
}

.icon-large {
  width: 48px;
  height: 48px;
  stroke: var(--primary-color);
  margin-bottom: 1.5rem;
}

.icon {
  width: 20px;
  height: 20px;
  stroke: var(--primary-color);
  flex-shrink: 0;
}

.contact-info h3 {
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.phone-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  text-decoration: none;
  margin: 1.5rem 0;
  transition: color 0.3s ease;
}

.phone-number:hover {
  color: var(--primary-color);
}

.schedule {
  margin: 2rem 0;
  color: var(--text-color);
}

.schedule p {
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.service-area {
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .contact-section {
    padding: 4rem 0;
  }

  .contact-card {
    padding: 2rem;
    margin: 0 1rem;
  }

  .phone-number {
    font-size: 2rem;
  }
}
</style> 