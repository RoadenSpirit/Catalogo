// src/utils/getImageUrl.js
import { API_CONFIG } from '../config/api.js';

/**
 * Normaliza y devuelve la URL de una imagen de Strapi.
 * Soporta:
 * - Imagen única (image.data)
 * - Múltiples imágenes (image.data como array)
 * - URLs relativas o absolutas
 * - Fallback a placeholder
 *
 * @param {Object|Array} image - Campo de media de Strapi (populate=*)
 * @returns {string} URL lista para usar en <img src="">
 */
export function getImageUrl(image) {
  // Caso 1: No hay imagen
  if (!image || !image.data) {
    return '/placeholder-image.jpg';
  }

  // Normalizar: siempre trabajar con array
  const imageArray = Array.isArray(image.data) ? image.data : [image.data];

  // Tomar la primera imagen válida
  const firstImage = imageArray.find(img => img?.attributes?.url);
  if (!firstImage?.attributes?.url) {
    return '/placeholder-image.jpg';
  }

  const url = firstImage.attributes.url;

  // Si es absoluta (http/https), devolver tal cual
  if (url.startsWith('http')) {
    return url;
  }

  // Si es relativa, prepend baseURL
  return `${API_CONFIG.baseURL}${url}`;
}