// Usar siempre la URL de producción
const apiUrl = import.meta.env.VITE_API_URL_PROD;

export const API_ENDPOINTS = {
  // Endpoints de la galería
  GALLERY: {
    GET_ITEMS: `${apiUrl}/api/gallery/items`,
    DELETE_ITEM: (id) => `${apiUrl}/api/gallery/items/${id}`,
    CREATE_ITEM: `${apiUrl}/api/gallery/items`,
    UPDATE_ITEM: (id) => `${apiUrl}/api/gallery/items/${id}`,
  }
};

export default apiUrl; 