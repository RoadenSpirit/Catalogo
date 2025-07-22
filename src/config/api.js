// src/config/api.js

const  {STRAPI_HOST,STRAPI_API_TOKEN} =  process.env

console.log(`[API_CONFIG] baseURL: ${STRAPI_HOST}, apiToken: ${STRAPI_API_TOKEN ? '***' : 'not set'}`);

export const API_CONFIG = {
  baseURL: STRAPI_HOST || 'http://localhost:1337',
  apiToken: STRAPI_API_TOKEN || '',
  endpoints: {
    settings: '/settings',
    products: '/productos',
  },
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutes
  },
  pagination: {
    pageSize: 12, // Ajustado para coincidir con tu diseño
    defaultPage: 1,
  },
  images: {
    lazyLoadOffset: 100,
    quality: 85,
    formats: ['webp', 'jpg'],
  }
};

export const DEFAULT_SETTINGS = {
  catalog_type: 'cafe', // 'cafe' or 'candy'
  logo: '/favicon.svg',
  background: '#ADD8E6',
  site_title: 'Product Catalog',
  description: 'Welcome to our product catalog'
};

export const CATALOG_TYPES = {
  CAFE: 'cafe',
  CANDY: 'candy'
};