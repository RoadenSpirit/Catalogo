import { query } from './strapiConnect.js';
import { API_CONFIG } from '../config/api.js';

// Get products with placeholder fallback
export async function getProducts() {
  const url = `${API_CONFIG.endpoints.products}?populate=images`;
  console.log(`[getProducts] Requesting URL: ${url}`);

  const response = await query(url);
  if (response && response.data) {
    console.log(`[getProducts] API Response:`, JSON.stringify(response.data, null, 2));
    return {
      data: response.data || [],
      meta: response.meta || {},
      pagination: response.meta?.pagination || {}
    };
  }

  return {
    data: generatePlaceholderProducts(),
    meta: {},
    pagination: {}
  };
}

// Generate placeholder products when API is unavailable
function generatePlaceholderProducts(count = 12) {
  const placeholderProducts = [];
  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty'];
  const productNames = [
    'Premium Wireless Headphones',
    'Comfortable Cotton T-Shirt',
    'Modern Table Lamp',
    'Professional Running Shoes',
    'Best Seller Novel',
    'Organic Face Cream'
  ];

  for (let i = 0; i < count; i++) {
    const randomCategory = categories[i % categories.length];
    const randomName = productNames[i % productNames.length];
    const randomPrice = Math.floor(Math.random() * 200) + 20;
    
    placeholderProducts.push({
      id: i + 1,
      attributes: {
        name: `${randomName} ${i + 1}`,
        description: `High-quality ${randomCategory.toLowerCase()} product with excellent features.`,
        price: randomPrice,
        category: randomCategory,
        images: {
          data: [{
            attributes: {
              url: `https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=400`,
              alternativeText: `${randomName} ${i + 1}`
            }
          }]
        }
      }
    });
  }

  return placeholderProducts;
}

// Get product image URL
export function getImageUrl(image) {
  if (!image) return '/placeholder-image.jpg';
  if (image.data && image.data.attributes && image.data.attributes.url) {
    return image.data.attributes.url.startsWith('http') ? image.data.attributes.url : `${API_CONFIG.baseURL}${image.data.attributes.url}`;
  }
  if (typeof image === 'string') {
    return image.startsWith('http') ? image : `${API_CONFIG.baseURL}${image}`;
  }
  if (image.url) {
    return image.url.startsWith('http') ? image.url : `${API_CONFIG.baseURL}${image.url}`;
  }
  return '/placeholder-image.jpg';
}