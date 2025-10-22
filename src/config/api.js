import { config } from "dotenv";

const { STRAPI_HOST, STRAPI_API_TOKEN } = process.env;

console.log(JSON.stringify({
  timestamp: new Date().toISOString(),
  level: 'info',
  context: 'api_config_load',
  details: {
    baseURL: process.env.STRAPI_URL,
    apiToken: process.env.STRAPI_API_TOKEN ? `${process.env.STRAPI_API_TOKEN.substring(0, 10)}...` : 'not set'
  }
}, null, 2));

export const API_CONFIG = {
  baseURL: process.env.STRAPI_URL,
  apiToken: process.env.STRAPI_API_TOKEN,
  endpoints: {
    products: '/productos',
    settings: '/settings',
    config: '/config'
  },
  errors: {
    NO_PRODUCTS: 'No hay productos disponibles actualmente.',
    CONNECTION_ERROR: 'Error de conexión con el servidor.',
    UNAUTHORIZED: 'Error de autenticación.',
  },
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutes
  },
  pagination: {
    pageSize: 12,
    defaultPage: 1,
  },
  images: {
    lazyLoadOffset: 100,
    quality: 85,
    formats: ['webp', 'jpg'],
  }
};

export const DEFAULT_SETTINGS = {
  heroTitle: 'Product Catalog',
  subTitle: 'Welcome to our product catalog',
  background: '/default-background.jpg',  // Add a local fallback image if needed
  logo: '/favicon.svg',
  catalog_type: 'cafe',  // Keep existing if relevant
};

export const CATALOG_TYPES = {
  CAFE: 'cafe',
  CANDY: 'candy'
};