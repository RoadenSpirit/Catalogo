// src/utils/getProductBySlug.js
import { query } from './strapiConnect.js';
import { API_CONFIG } from '../config/api.js';
import { getImageUrl } from './getImageUrl.js';

export async function getProductBySlug(slug) {
  const url = `${API_CONFIG.endpoints.products}?filters[slug][$eq]=${slug}&populate=images`;
  
  try {
    const response = await query(url);
    
    if (!response?.data?.length) {
      return { data: null, error: 'Producto no encontrado' };
    }

    const product = response.data[0];
    const attrs = product.attributes;

    return {
      data: {
        id: product.id,
        name: attrs.name,
        price: attrs.price,
        category: attrs.category,
        image: getImageUrl(attrs.images),
        shortDescription: attrs.shortDescription,
        description: attrs.description || 'Sin descripción completa.',
        slug: attrs.slug
      },
      error: null
    };
  } catch (error) {
    console.error('[getProductBySlug] Error:', error);
    return { data: null, error: 'Error del servidor' };
  }
}