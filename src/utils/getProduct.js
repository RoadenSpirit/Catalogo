import { query } from './strapiConnect.js';
import { API_CONFIG } from '../config/api.js';

// Definir tipos de errores
const ErrorTypes = {
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  API_ERROR: 'API_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  IMAGE_ERROR: 'IMAGE_ERROR'
};

// Get products
export async function getProducts() {
  const url = `${API_CONFIG.endpoints.products}?populate=imagen`;
  
  try {
    const response = await query(url);
    
    if (!response || response.error || !Array.isArray(response.data)) {
      return { data: [], meta: {}, pagination: {}, error: { type: ErrorTypes.API_ERROR, message: 'Invalid response' } };
    }

    console.log('[getProducts] Response structure:', JSON.stringify(response, null, 2));
    
    return {
      data: response.data,
      meta: response.meta || {},
      pagination: response.meta?.pagination || {},
      error: null
    };

  } catch (error) {
    return { data: [], meta: {}, pagination: {}, error: { type: ErrorTypes.CONNECTION_ERROR, message: 'Connection failed' } };
  }
}

// getImageUrl ajustado para Multiple media
export function getImageUrl(image) {
  try {
    if (!image || !image.data || !Array.isArray(image.data) || !image.data[0]?.attributes?.url) {
      throw new Error('No image data');
    }
    const url = image.data[0].attributes.url; // Usa la primera imagen del array
    return url.startsWith('http') ? url : `${API_CONFIG.baseURL}${url}`;
  } catch (error) {
    console.warn('[getImageUrl] Warn:', error.message);
    return '/placeholder-image.jpg';
  }
}