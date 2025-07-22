import { API_CONFIG } from '../config/api.js';
export async function query(url: string) {
  try {
    if (!API_CONFIG.apiToken) {
      console.error('[query] Error: STRAPI_API_TOKEN is not defined');
      return null;
    }
    const fullUrl = `${API_CONFIG.baseURL}/api${url}`;
    console.log(`[query] Requesting URL: ${fullUrl}`);
    const headers: HeadersInit = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_CONFIG.apiToken}`
    };
    const response = await fetch(fullUrl, { headers });
    if (!response.ok) {
      console.error(`[query] Error fetching ${fullUrl}: ${response.status} ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    console.log(`[query] Response data:`, data);
    return data;
  } catch (error) {
    console.error(`[query] Error fetching ${url}:`, error);
    return null;
  }
}