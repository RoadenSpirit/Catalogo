// src/utils/getProduct.js
import { query } from './strapiConnect.js';
import { API_CONFIG } from '../config/api.js';
import { getImageUrl } from './getImageUrl.js';

export async function getProducts() {
  const url = `${API_CONFIG.endpoints.products}?populate=images`;
  console.log(`[getProducts] Full URL: ${API_CONFIG.baseURL}/api${url}`);
  
  try {
    const response = await query(url);
    
    console.log('[getProducts] Raw server response:', JSON.stringify({
      data: response?.data?.map((item, index) => ({
        index,
        id: item.id,
        attributes: {
          name: item.attributes.name,
          price: item.attributes.price,
          category: item.attributes.category,
          description: item.attributes.description,
          shortDescription: item.attributes.shortDescription,
          discountPrice: item.attributes.discountPrice,  // ← NUEVO: Campo de precio con descuento
          quantity: item.attributes.quantity,            // ← NUEVO: Campo de cantidad
          images: item.attributes.images
        }
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

    const formattedProducts = response.data.map(product => {
      const attrs = product.attributes;
      return {
        id: product.id,
        name: attrs.name || 'Sin nombre',
        price: attrs.price || 0,
        category: attrs.category || 'General',
        image: getImageUrl(attrs.images),
        shortDescription: attrs.shortDescription || 'Producto de calidad.',
        description: attrs.description || '',
        slug: attrs.slug || `producto-${product.id}`,
        discountPrice: attrs.discountPrice || null,  // ← NUEVO: Precio con descuento (null si no existe)
        quantity: attrs.quantity || 0                // ← NUEVO: Cantidad disponible (0 si no existe)
      };
    });

    console.log(`[getProducts] Successfully fetched and formatted ${formattedProducts.length} products`);
    console.log('[getProducts] Formatted products sample:', JSON.stringify(
      formattedProducts.map(p => ({
        id: p.id,
        name: p.name,
        shortDescription: p.shortDescription,
        hasFullDescription: !!p.description && p.description.length > 50,
        discountPrice: p.discountPrice,  // ← NUEVO: Incluir en el sample log
        quantity: p.quantity             // ← NUEVO: Incluir en el sample log
      })), null, 2));
    
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