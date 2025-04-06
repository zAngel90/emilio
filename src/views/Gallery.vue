<script setup>
import { ref, onMounted } from 'vue'
import BeforeAfterSlider from '../components/BeforeAfterSlider.vue'
import { API_ENDPOINTS } from '../config/api'

const items = ref([])
const loading = ref(false)
const error = ref(null)
const selectedItem = ref(null)
const featuredItem = ref(null)
const loadedImages = ref(new Map())

const getImageUrl = (url) => {
  if (!url) return '';
  return loadedImages.value?.get(url) || url;
};

const loadImageWithHeaders = (src) => {
  if (!src) return Promise.resolve('');
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      if (loadedImages.value) {
        loadedImages.value.set(src, img.src);
      }
      resolve(img.src);
    };
    img.onerror = () => {
      if (loadedImages.value) {
        loadedImages.value.set(src, src);
      }
      resolve(src);
    };
    
    fetch(src, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      if (loadedImages.value) {
        loadedImages.value.set(src, url);
      }
      img.src = url;
    })
    .catch(() => {
      if (loadedImages.value) {
        loadedImages.value.set(src, src);
      }
      img.src = src;
    });
  });
};

const preloadImage = async (url) => {
  if (!url) return '';
  if (!loadedImages.value.has(url)) {
    try {
      await loadImageWithHeaders(url);
    } catch (err) {
      console.error('Error loading image:', err);
      loadedImages.value.set(url, url);
    }
  }
  return loadedImages.value.get(url);
};

const fetchGalleryItems = async () => {
  loading.value = true;
  try {
    const response = await fetch(API_ENDPOINTS.GALLERY.GET_ITEMS, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Verificar el tipo de contenido
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }
    
    const data = await response.json();
    console.log('Datos recibidos:', data);
    
    // Procesar y cargar las imágenes normales
    items.value = data.filter(item => !item.is_before_after);
    
    // Precargar todas las imágenes
    for (const item of items.value) {
      if (item.images[0]?.url) {
        await preloadImage(item.images[0].url);
      }
    }
    
    // Procesar imágenes antes/después
    const beforeAfterItem = data.find(item => item.is_before_after);
    if (beforeAfterItem) {
      const beforeImage = beforeAfterItem.images.find(img => img.type === 'before');
      const afterImage = beforeAfterItem.images.find(img => img.type === 'after');
      
      if (beforeImage && afterImage) {
        await Promise.all([
          preloadImage(beforeImage.url),
          preloadImage(afterImage.url)
        ]);
        
        featuredItem.value = {
          ...beforeAfterItem,
          beforeImage: beforeImage.url,
          afterImage: afterImage.url
        };
      }
    }
  } catch (err) {
    error.value = `Error al cargar la galería: ${err.message}`;
    console.error('Error detallado:', err);
  } finally {
    loading.value = false;
  }
};

const openModal = async (item) => {
  loading.value = true;
  selectedItem.value = item;
  document.body.style.overflow = 'hidden';
  
  try {
    if (item.images && item.images[0]?.url) {
      await loadImageWithHeaders(item.images[0].url);
    }
  } catch (error) {
    console.error('Error loading modal image:', error);
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  selectedItem.value = null;
  document.body.style.overflow = 'auto';
  loading.value = false;
};

const handleImageError = (e) => {
  e.target.src = '/placeholder-image.jpg'
}

onMounted(() => {
  fetchGalleryItems()
})
</script>

<template>
  <div class="gallery-page">
    <div class="gallery-container">
      <h1>Galería de Trabajos</h1>

      <!-- Sección de Antes/Después -->
      <section v-if="featuredItem" class="before-after-section">
        <h2>Antes y Después</h2>
        <div class="before-after-wrapper">
          <div class="slider-container">
            <BeforeAfterSlider
              :beforeImage="featuredItem.beforeImage"
              :afterImage="featuredItem.afterImage"
            />
          </div>
          <div class="section-description">
            <h3>Antes - Después</h3>
            <p>¿Quiere que su entorno vuelva a brillar? Contáctenos y le asesoraremos sin coste.</p>
            <router-link to="/contacto" class="contact-button">Contacto</router-link>
          </div>
        </div>
      </section>

      <!-- Galería Principal -->
      <section class="gallery-section">
        <h2>Nuestros Trabajos</h2>
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Cargando galería...</p>
        </div>
        
        <div v-else-if="error" class="error">
          {{ error }}
        </div>
        
        <div v-else class="gallery-mosaic">
          <div v-for="item in items" 
               :key="item.id" 
               class="gallery-item"
               @click="openModal(item)">
            <div class="image-container" 
                 :style="{ backgroundImage: `url('${getImageUrl(item.images[0]?.url)}')` }">
            </div>
            <div class="item-overlay">
              <div class="expand-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="selectedItem" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div v-if="loading" class="loading-modal">
            <div class="spinner"></div>
          </div>
          <div v-else class="modal-image-container">
            <img 
              v-if="selectedItem.images[0]?.url"
              :src="getImageUrl(selectedItem.images[0].url)"
              :alt="selectedItem.title || 'Imagen en pantalla completa'"
              class="modal-image"
              @error="handleImageError"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.gallery-page {
  min-height: calc(100vh - var(--navbar-height));
  background-color: var(--light-bg);
}

.gallery-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 0;
}

h1, h2 {
  color: var(--text-color);
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
  margin-top: 3rem;
}

/* Estilos para la sección antes/después */
.before-after-section {
  margin: 2rem auto 4rem;
  padding: 0 1rem;
  max-width: 1200px;
}

.before-after-wrapper {
  display: flex;
  gap: 2rem;
  align-items: stretch;
  background: white;
}

.slider-container {
  flex: 1;
  min-width: 0; /* Importante para que el slider no se desborde */
}

.section-description {
  flex: 0 0 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background: white;
  color: var(--text-color);
}

.section-description h3 {
  font-size: 1.75rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.section-description p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.contact-button {
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.contact-button:hover {
  transform: translateY(-2px);
  background: var(--primary-color-dark, #1a3c7d);
}

/* Nuevo estilo mosaico para la galería */
.gallery-mosaic {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0;
  background: white;
  padding: 0;
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
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

.expand-icon {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;
}

.expand-icon svg {
  width: 100%;
  height: 100%;
  stroke: white;
}

.gallery-item:hover .expand-icon {
  transform: scale(1.1);
  background-color: rgba(0, 0, 0, 0.6);
  border-color: white;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  position: relative;
  width: 90vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 4px;
}

.modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.modal-close svg {
  width: 100%;
  height: 100%;
  stroke: white;
  transition: transform 0.3s ease;
}

.modal-close:hover svg {
  transform: rotate(90deg);
}

/* Loading and error states */
.loading {
  text-align: center;
  padding: 4rem;
  color: var(--text-color);
}

.spinner {
  width: 50px;
  height: 50px;
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

.loading-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loading-modal .spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #fff;
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@media (max-width: 968px) {
  .before-after-wrapper {
    flex-direction: column;
    gap: 1rem;
  }

  .section-description {
    flex: none;
    padding: 1.5rem;
  }

  .section-description h3 {
    font-size: 1.5rem;
  }

  .section-description p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 768px) {
  .gallery-container {
    padding: 1rem;
  }

  .gallery-mosaic {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .before-after-section {
    margin: 1rem auto 3rem;
    padding: 0 1rem;
  }

  .section-description {
    padding: 1rem;
  }

  .section-description p {
    font-size: 1rem;
  }
}
</style>