// src/utils/getConfig.js
import { query } from './strapiConnect.js';
import { API_CONFIG } from '../config/api.js';
import { getImageUrl } from './getImageUrl.js';

// Error types for consistency with other utils
const ErrorTypes = {
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  API_ERROR: 'API_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
};

// Fetch and format config single type from Strapi
export async function getConfig() {
  const url = `${API_CONFIG.endpoints.config}?populate=background,logo`;
  console.log(`[getConfig] Full URL: ${API_CONFIG.baseURL}/api${url}`);
  
  try {
    const response = await query(url);
    
    // Log raw server response for debugging
    console.log('[getConfig] Raw server response:', JSON.stringify({
      data: response?.data || null,
      meta: response?.meta || {}
    }, null, 2));
    
    if (!response) {
      console.error('[getConfig] No response from API');
      throw { 
        type: ErrorTypes.CONNECTION_ERROR,
        message: 'No se pudo conectar con el servidor',
        url
      };
    }

    if (response.error) {
      console.error('[getConfig] API Error:', response.error);
      throw {
        type: ErrorTypes.API_ERROR,
        message: response.error.message || 'Error en la respuesta del API',
        status: response.error.status,
        details: response.error.details
      };
    }

    // Validate structure for single type
    if (!response.data || !response.data.attributes) {
      console.error('[getConfig] Invalid data structure:', response);
      throw {
        type: ErrorTypes.VALIDATION_ERROR,
        message: 'Estructura de datos inválida'
      };
    }

    const attributes = response.data.attributes;
    
    // Format config with fallbacks and image formatting
    const formattedConfig = {
      heroTitle: attributes.heroTitle || API_CONFIG.DEFAULT_SETTINGS.heroTitle,
      subTitle: attributes.subTitle || API_CONFIG.DEFAULT_SETTINGS.subTitle,
      background: getImageUrl(attributes.background),
      logo: getImageUrl(attributes.logo),
    };

    console.log(`[getConfig] Successfully fetched and formatted config`);
    console.log('[getConfig] Formatted config:', JSON.stringify(formattedConfig, null, 2));
    
    return {
      data: formattedConfig,
      error: null
    };

  } catch (error) {
    console.error('[getConfig] Error:', {
      baseURL: API_CONFIG.baseURL,
      endpoint: url,
      error: error.message
    });
    
    // Return defaults on error
    return {
      data: API_CONFIG.DEFAULT_SETTINGS,
      error: {
        type: error.type || ErrorTypes.CONNECTION_ERROR,
        message: error.message,
        details: error
      }
    };
  }
}