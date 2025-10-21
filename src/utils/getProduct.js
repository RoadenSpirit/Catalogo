import { query } from './strapiConnect.js';
import { API_CONFIG } from '../config/api.js';

// Simplified getImageUrl for Strapi media (handle single or multiple images)
export function getImageUrl(image) {
  // Return placeholder if image is missing or invalid
  if (!image?.data) {
    return '/placeholder-image.jpg';
  }

  // Handle data as object (single) or array (multiple)
  let imageData = image.data;
  if (!Array.isArray(imageData)) {
    imageData = [imageData]; // Convert to array for consistency
  }

  const url = imageData[0]?.attributes?.url;
  // Prepend baseURL if the URL is relative
  return url ? (url.startsWith('http') ? url : `${API_CONFIG.baseURL}${url}`) : '/placeholder-image.jpg';
}

// Get products and format them for use
export async function getProducts() {
  const url = `${API_CONFIG.endpoints.products}?populate=images`;
  console.log(`[getProducts] Full URL: ${API_CONFIG.baseURL}/api${url}`);
  
  try {
    const response = await query(url);
    
    // Log raw server response with detailed attributes
    console.log('[getProducts] Raw server response:', JSON.stringify({
      data: response?.data?.map((item, index) => ({
        index,
        id: item.id,
        attributes: item.attributes
      })) || [],
      meta: response?.meta || {}
    }, null, 2));
    
    if (!response) {
      console.error('[getProducts] No response from API');
      return {
        data: [],
        meta: {},
        pagination: {},
        error: { message: 'No se pudo conectar con el servidor' }
      };
    }

    if (response.error) {
      console.error('[getProducts] API Error:', response.error);
      return {
        data: [],
        meta: {},
        pagination: {},
        error: { message: response.error.message || 'Error en la respuesta del API' }
      };
    }

    // Validar estructura de datos
    if (!Array.isArray(response.data)) {
      console.error('[getProducts] Invalid data structure:', response);
      return {
        data: [],
        meta: {},
        pagination: {},
        error: { message: 'Estructura de datos inválida' }
      };
    }

    // Format products with default values
    const formattedProducts = response.data.map(product => ({
      id: product.id || 0,
      name: product.attributes.name || 'Unnamed Product',
      price: product.attributes.price || 0,
      category: product.attributes.category || 'Uncategorized',
      image: getImageUrl(product.attributes.images)
    }));

    console.log(`[getProducts] Successfully fetched and formatted ${formattedProducts.length} products`);
    
    // Log final: Mostrar productos formateados como los recibiría ProductGrid
    console.log('[getProducts] Formatted products:', JSON.stringify(formattedProducts, null, 2));
    
    return {
      data: formattedProducts,
      meta: response.meta || {},
      pagination: response.meta?.pagination || {},
      error: null
    };

  } catch (error) {
    console.error('[getProducts] Connection error:', {
      baseURL: API_CONFIG.baseURL,
      endpoint: url,
      error: error.message
    });
    
    return {
      data: [],
      meta: {},
      pagination: {},
      error: { message: 'Error de conexión con el servidor' }
    };
  }
}