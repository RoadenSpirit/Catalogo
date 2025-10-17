import { API_CONFIG } from '../config/api.js';
export async function query(url: string) {
  try {
    if (!API_CONFIG.apiToken) {
      return null; // Silencioso, sin log
    }
    
    const fullUrl = `${API_CONFIG.baseURL}/api${url}`;
    
    const headers = {
      'Authorization': `Bearer ${API_CONFIG.apiToken}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      return null; // Silencioso en error, manejado en getProducts
    }

    return await response.json();
  } catch (error) {
    return null; // Silencioso, sin log
  }
}