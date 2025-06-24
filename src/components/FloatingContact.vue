<template>
  <a href="tel:665402571" class="floating-contact">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="phone-icon">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
    <span>665 402 571</span>
  </a>
</template>

<style scoped>
.floating-contact {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #FFD700;
  color: #000000;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 999;
  transition: all 0.3s ease;
}

.floating-contact:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.phone-icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .floating-contact {
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 0.6rem 1.2rem;
  }
  
  .floating-contact span {
    font-size: 0.9rem;
  }
  
  .phone-icon {
    width: 20px;
    height: 20px;
  }
}
</style> 