<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'

const { logout } = useAuth()
const items = ref([])
const loading = ref(false)
const error = ref(null)
const isBeforeAfter = ref(false)
const beforeImage = ref(null)
const afterImage = ref(null)

const handleImageError = (e) => {
  e.target.src = '/placeholder-image.jpg' // Imagen por defecto si falla la carga
}

const fetchGalleryItems = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3000/api/gallery/items')
    const data = await response.json()
    items.value = data
  } catch (err) {
    error.value = 'Error al cargar los items de la galería'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleBeforeImageSelect = (event) => {
  beforeImage.value = event.target.files[0]
}

const handleAfterImageSelect = (event) => {
  afterImage.value = event.target.files[0]
}

const handleFileUpload = async (event) => {
  if (isBeforeAfter.value) {
    if (!beforeImage.value || !afterImage.value) {
      error.value = 'Debes seleccionar ambas imágenes (antes y después)'
      return
    }

    const formData = new FormData()
    formData.append('images', beforeImage.value)
    formData.append('images', afterImage.value)
    formData.append('is_before_after', true)

    try {
      const response = await fetch('http://localhost:3000/api/gallery/items', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('Error al subir las imágenes')
      }
      
      await fetchGalleryItems()
      // Limpiar los inputs y estados
      beforeImage.value = null
      afterImage.value = null
      document.getElementById('beforeImage').value = ''
      document.getElementById('afterImage').value = ''
      isBeforeAfter.value = false
    } catch (err) {
      error.value = 'Error al subir las imágenes'
      console.error(err)
    }
  } else {
    const formData = new FormData()
    const files = event.target.files
    
    if (!files.length) return

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
    }

    formData.append('is_before_after', false)

    try {
      const response = await fetch('http://localhost:3000/api/gallery/items', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('Error al subir las imágenes')
      }
      
      await fetchGalleryItems()
      event.target.value = ''
    } catch (err) {
      error.value = 'Error al subir las imágenes'
      console.error(err)
    }
  }
}

const deleteItem = async (id) => {
  if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) return

  try {
    const response = await fetch(`http://localhost:3000/api/gallery/items/${id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      throw new Error('Error al eliminar la imagen')
    }
    
    await fetchGalleryItems()
  } catch (err) {
    error.value = 'Error al eliminar la imagen'
    console.error(err)
  }
}

onMounted(() => {
  fetchGalleryItems()
})
</script>

<template>
  <div class="admin-panel">
    <header class="admin-header">
      <h1>Panel Administrativo</h1>
      <button @click="logout" class="logout-button">
        <i class="fas fa-sign-out-alt"></i>
        Cerrar Sesión
      </button>
    </header>

    <main class="admin-content">
      <section class="upload-section">
        <h2>Subir Nuevas Imágenes</h2>
        <div class="upload-container">
          <div class="upload-options">
            <label class="before-after-toggle">
              <input 
                type="checkbox" 
                v-model="isBeforeAfter"
              >
              Imágenes Antes/Después
            </label>
          </div>

          <!-- Subida de imágenes Antes/Después -->
          <div v-if="isBeforeAfter" class="before-after-uploads">
            <div class="upload-group">
              <h3>Imagen "Antes"</h3>
              <input 
                type="file"
                id="beforeImage"
                accept="image/*"
                @change="handleBeforeImageSelect"
                class="file-input"
              >
              <label for="beforeImage" class="upload-button">
                <i class="fas fa-cloud-upload-alt"></i>
                Seleccionar imagen "Antes"
              </label>
              <span v-if="beforeImage" class="file-selected">
                {{ beforeImage.name }}
              </span>
            </div>

            <div class="upload-group">
              <h3>Imagen "Después"</h3>
              <input 
                type="file"
                id="afterImage"
                accept="image/*"
                @change="handleAfterImageSelect"
                class="file-input"
              >
              <label for="afterImage" class="upload-button">
                <i class="fas fa-cloud-upload-alt"></i>
                Seleccionar imagen "Después"
              </label>
              <span v-if="afterImage" class="file-selected">
                {{ afterImage.name }}
              </span>
            </div>

            <button 
              @click="handleFileUpload"
              class="submit-button"
              :disabled="!beforeImage || !afterImage"
            >
              Subir Imágenes Antes/Después
            </button>
          </div>

          <!-- Subida de imágenes normales -->
          <div v-else>
            <input 
              type="file" 
              id="fileUpload" 
              multiple 
              accept="image/*"
              @change="handleFileUpload"
              class="file-input"
            >
            <label for="fileUpload" class="upload-button">
              <i class="fas fa-cloud-upload-alt"></i>
              Seleccionar Imágenes
            </label>
          </div>
        </div>
      </section>

      <section class="gallery-management">
        <h2>Gestionar Galería</h2>
        
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Cargando...</p>
        </div>
        
        <div v-else-if="error" class="error">
          {{ error }}
        </div>
        
        <div v-else class="gallery-grid">
          <div v-for="item in items" :key="item.id" class="gallery-item">
            <div class="image-container">
              <img 
                :src="item.images[0]?.url" 
                :alt="item.title"
                @error="e => e.target.src = '/placeholder-image.jpg'"
              >
              <div v-if="item.is_before_after" class="before-after-badge">
                Antes/Después
              </div>
            </div>
            <div class="item-actions">
              <button @click="deleteItem(item.id)" class="delete-button">
                <i class="fas fa-trash"></i>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.admin-panel {
  min-height: 100vh;
  background-color: var(--light-bg);
  padding: 2rem;
}

.admin-header {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-header h1 {
  color: var(--text-color);
  margin: 0;
}

.logout-button {
  background: var(--text-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.3s ease;
}

.logout-button:hover {
  opacity: 0.9;
}

.admin-content {
  display: grid;
  gap: 2rem;
}

.upload-section, .gallery-management {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.upload-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.upload-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.before-after-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.upload-info {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.file-input {
  display: none;
}

.upload-button {
  background: var(--primary-color);
  color: var(--text-color);
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
}

.upload-button:hover {
  transform: translateY(-2px);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-container {
  position: relative;
  aspect-ratio: 4/3;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.before-after-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.item-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .item-actions {
  opacity: 1;
}

.delete-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.delete-button:hover {
  background: #c82333;
}

.loading {
  text-align: center;
  padding: 2rem;
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
  color: #dc3545;
  text-align: center;
  padding: 2rem;
}

@media (max-width: 768px) {
  .admin-panel {
    padding: 1rem;
  }

  .admin-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

.before-after-uploads {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.upload-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.upload-group h3 {
  font-size: 1rem;
  color: var(--text-color);
  margin: 0;
}

.file-selected {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

.submit-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.3s ease;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-button:not(:disabled):hover {
  opacity: 0.9;
}
</style> 