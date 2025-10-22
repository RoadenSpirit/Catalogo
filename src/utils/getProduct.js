import { query } from './strapiConnect.js';
import { API_CONFIG } from '../config/api.js';
import { getImageUrl } from './getImageUrl.js';  // Import externo

export async function getProducts() {
  const url = `${API_CONFIG.endpoints.products}?populate=images`;
  console.log(`[getProducts] Full URL: ${API_CONFIG.baseURL}/api${url}`);
  
  try {
    const response = await query(url);
    
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

    if (!Array.isArray(response.data)) {
      console.error('[getProducts] Invalid data structure:', response);
      return {
        data: [],
        meta: {},
        pagination: {},
        error: { message: 'Estructura de datos inválida' }
      };
    }

    const formattedProducts = response.data.map(product => ({
      id: product.id || 0,
      name: product.attributes.name || 'Unnamed Product',
      price: product.attributes.price || 0,
      category: product.attributes.category || 'Uncategorized',
      image: getImageUrl(product.attributes.images)  // Usamos función externa
    }));

    console.log(`[getProducts] Successfully fetched and formatted ${formattedProducts.length} products`);
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