<template>
  <div v-if="showBanner" class="cookie-banner">
    <div class="cookie-content">
      <p>
        Usamos cookies para mejorar tu experiencia y mostrar anuncios personalizados.
        Puedes aceptar todas, rechazar todas o configurar tus preferencias.
      </p>

      <div v-if="!configMode" class="actions">
        <button @click="acceptAll" class="accept-btn">Aceptar todas</button>
        <button @click="rejectAll" class="reject-btn">Rechazar todas</button>
        <button @click="configMode = true" class="config-btn">Configurar</button>
      </div>

      <div v-else class="config-panel">
        <label>
          <input type="checkbox" v-model="preferences.analitica" />
          Cookies de analítica (estadísticas)
        </label>
        <label>
          <input type="checkbox" v-model="preferences.marketing" />
          Cookies de marketing (anuncios)
        </label>

        <div class="config-actions">
          <button @click="savePreferences" class="accept-btn">Guardar preferencias</button>
          <button @click="cancelConfig" class="reject-btn">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookieBanner',
  data() {
    return {
      showBanner: false,
      configMode: false,
      preferences: {
        analitica: false,
        marketing: false
      }
    }
  },
  mounted() {
    const saved = localStorage.getItem('cookiePreferences')
    if (saved) {
      const prefs = JSON.parse(saved)
      this.preferences = prefs
      if (prefs.marketing) this.loadPixel()
    } else {
      this.showBanner = true
    }
  },
  methods: {
    acceptAll() {
      this.preferences = { analitica: true, marketing: true }
      this.saveAndClose()
    },
    rejectAll() {
      this.preferences = { analitica: false, marketing: false }
      this.saveAndClose()
    },
    savePreferences() {
      this.saveAndClose()
    },
    cancelConfig() {
      this.configMode = false
    },
    saveAndClose() {
      localStorage.setItem('cookiePreferences', JSON.stringify(this.preferences))
      this.showBanner = false
      this.configMode = false
      if (this.preferences.marketing) {
        this.loadPixel()
      }
    },
    loadPixel() {
      // Aquí llamas al código que carga el píxel de Meta (inserta tu función)
      if (window.loadPixel) window.loadPixel()
    }
  }
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  font-family: Arial, sans-serif;
  color: #333;
  z-index: 9999;
}

.cookie-content p {
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.actions,
.config-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.accept-btn {
  background-color: #1877f2; /* azul Meta */
  color: white;
}

.accept-btn:hover {
  background-color: #145dbf;
}

.reject-btn {
  background-color: #ddd;
  color: #555;
}

.reject-btn:hover {
  background-color: #bbb;
}

.config-btn {
  background-color: transparent;
  color: #1877f2;
  border: 1px solid #1877f2;
  font-weight: 500;
}

.config-btn:hover {
  background-color: #e4f0ff;
}

.config-panel label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}
</style>
