<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  beforeImage: {
    type: String,
    required: true
  },
  afterImage: {
    type: String,
    required: true
  }
});

const container = ref(null);
const sliderPosition = ref(50);
const imagesLoaded = ref(false);
const error = ref(false);
let isSliding = false;

const loadImages = async () => {
  imagesLoaded.value = false;
  error.value = false;
  
  try {
    await Promise.all([
      loadImage(props.beforeImage),
      loadImage(props.afterImage)
    ]);
    imagesLoaded.value = true;
  } catch (err) {
    console.error('Error loading images:', err);
    error.value = true;
  }
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
};

const startSliding = (e) => {
  if (!imagesLoaded.value) return;
  e.preventDefault();
  
  isSliding = true;
  document.addEventListener('mousemove', slide);
  document.addEventListener('touchmove', slide);
  document.addEventListener('mouseup', stopSliding);
  document.addEventListener('touchend', stopSliding);
};

const slide = (e) => {
  if (!isSliding || !container.value) return;
  
  const containerRect = container.value.getBoundingClientRect();
  const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const position = ((x - containerRect.left) / containerRect.width) * 100;
  
  sliderPosition.value = Math.min(Math.max(position, 0), 100);
};

const stopSliding = () => {
  isSliding = false;
  document.removeEventListener('mousemove', slide);
  document.removeEventListener('touchmove', slide);
};

watch(() => [props.beforeImage, props.afterImage], loadImages, { immediate: true });

onUnmounted(() => {
  document.removeEventListener('mousemove', slide);
  document.removeEventListener('touchmove', slide);
  document.removeEventListener('mouseup', stopSliding);
  document.removeEventListener('touchend', stopSliding);
});
</script>

<template>
  <div class="before-after-container">
    <div v-if="error" class="error-message">
      Error al cargar las imágenes
    </div>
    <div v-else-if="!imagesLoaded" class="loading">
      <div class="spinner"></div>
      <span>Cargando imágenes...</span>
    </div>
    <div v-else class="comparison-slider" ref="container">
      <div class="before-image" :style="{ backgroundImage: `url('${beforeImage}')` }"></div>
      <div class="after-image" :style="{ backgroundImage: `url('${afterImage}')`, width: `${sliderPosition}%` }"></div>
      <div class="slider-handle" 
           @mousedown="startSliding"
           @touchstart="startSliding"
           :style="{ left: `${sliderPosition}%` }">
        <div class="slider-circle"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.before-after-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16/10;
  overflow: hidden;
  user-select: none;
  margin: 0 auto;
}

.loading,
.error-message {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  font-size: 1.1rem;
}

.error-message {
  color: #dc3545;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--primary-color);
  border-top: 4px solid transparent;
  border-radius: 50%;
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.comparison-slider {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: ew-resize;
}

.before-image,
.after-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.after-image {
  border-right: 2px solid #fff;
}

.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #fff;
  transform: translateX(-50%);
  pointer-events: none;
}

.slider-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 50%;
  pointer-events: auto;
  cursor: grab;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.5);
}

.slider-circle:active {
  cursor: grabbing;
}

@media (max-width: 768px) {
  .before-after-container {
    max-width: 100%;
  }

  .slider-circle {
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
  }
}
</style> 