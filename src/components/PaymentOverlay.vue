<template>
  <div class="payment-overlay">
    <div class="payment-message">
      <h2>🔒 Sitio Web Bloqueado</h2>
      <div class="payment-info">
        <p>Cambios realizados por 40 USD</p>
        <p class="highlight">Deposita lo restante para desbloquear la página</p>
        <p class="warning">⚠️ De lo contrario, los cambios serán revertidos</p>
      </div>
      <div class="contact-info">
        <p>Para realizar el pago, contacta al desarrollador:</p>
        <a href="https://www.workana.com/freelancer/c7771475af793856f6b4455809780c6f" target="_blank" class="contact-button">
          <i class="fas fa-user"></i> Contactar en Workana
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.payment-message {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

h2 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.payment-info {
  margin: 2rem 0;
}

.payment-info p {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.highlight {
  color: #FFD700;
  font-weight: bold;
  font-size: 1.4rem !important;
  margin: 1rem 0 !important;
}

.warning {
  color: #dc3545;
  font-weight: bold;
  font-size: 1.1rem !important;
  margin-top: 1rem !important;
}

.contact-info {
  margin-top: 2rem;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #FFD700;
  color: #333;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 1rem;
  transition: transform 0.3s ease;
}

.contact-button:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .payment-message {
    width: 95%;
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .payment-info p {
    font-size: 1rem;
  }

  .highlight {
    font-size: 1.2rem !important;
  }

  .warning {
    font-size: 1rem !important;
  }
}
</style> 