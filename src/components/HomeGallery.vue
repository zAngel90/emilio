<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { API_ENDPOINTS } from '../config/api'

const router = useRouter()
const items = ref([])
const loading = ref(false)
const error = ref(null)
const loadedImages = ref(new Map())

const loadImageWithHeaders = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img.src);
    img.onerror = () => reject();
    
    fetch(src, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      img.src = url;
      loadedImages.value.set(src, url);
    })
    .catch(() => {
      loadedImages.value.set(src, src);
      img.src = src; // Fallback al método original si falla
    });
  });
};

const fetchGalleryItems = async () => {
  loading.value = true
  try {
    const response = await fetch(API_ENDPOINTS.GALLERY.GET_ITEMS, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor')
    }
    const data = await response.json()
    
    // Verificar que data sea un array
    if (!Array.isArray(data)) {
      console.error('La respuesta no es un array:', data)
      error.value = 'Error en el formato de datos'
      return
    }

    items.value = data
      .filter(item => !item.is_before_after)
      .slice(0, 6)
      .map(item => ({
        ...item,
        images: item.images.map(img => ({
          ...img,
          url: img.url.replace('http://', 'https://')
        }))
      }))

    // Precargar todas las imágenes
    for (const item of items.value) {
      if (item.images[0]?.url) {
        await loadImageWithHeaders(item.images[0].url);
      }
    }
  } catch (err) {
    error.value = 'Error al cargar la galería'
    console.error('Error detallado:', err)
  } finally {
    loading.value = false
  }
}

const goToGallery = () => {
  router.push('/galeria')
}

onMounted(() => {
  fetchGalleryItems()
})
</script>

<template>
  <section class="home-gallery section-wrapper">
    <div class="container">
      <h2 class="section-title">Nuestros Trabajos</h2>
      <p class="section-subtitle">Descubra algunos ejemplos de nuestros servicios</p>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <span>Cargando galería...</span>
      </div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <div v-else class="gallery-preview">
        <div v-for="item in items" 
             :key="item.id" 
             class="gallery-item"
             @click="goToGallery">
          <div class="image-container" 
               :style="{ backgroundImage: `url('${loadedImages.get(item.images[0]?.url) || ''}')` }">
          </div>
          <div class="item-overlay">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div class="gallery-action">
        <button class="view-more" @click="goToGallery">
          Ver Galería Completa
          <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-gallery {
  padding: 4rem 0;
  background-color: var(--white);
}

.gallery-preview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  border-radius: 8px;
}

.image-container {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
}

.gallery-item:hover .image-container {
  transform: scale(1.05);
}

.item-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .item-overlay {
  opacity: 1;
}

.icon {
  width: 32px;
  height: 32px;
  stroke: white;
  padding: 6px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.gallery-action {
  text-align: center;
  margin-top: 2rem;
}

.view-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-more:hover {
  transform: translateY(-2px);
  background-color: var(--primary-color-dark, #1a3c7d);
}

.arrow-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.loading {
  text-align: center;
  padding: 4rem;
  color: var(--text-color);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--primary-color);
  border-top: 4px solid transparent;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  color: #dc3545;
  padding: 2rem;
}

.gallery-item img {
  display: none;
}

@media (max-width: 768px) {
  .home-gallery {
    padding: 3rem 0;
  }

  .gallery-preview {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .icon {
    width: 24px;
    height: 24px;
  }
}
</style> 