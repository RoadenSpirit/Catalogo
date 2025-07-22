import dotenv from 'dotenv'; dotenv.config();
console.log('STRAPI_HOST:', process.env.STRAPI_HOST);
console.log('STRAPI_API_TOKEN:', process.env.STRAPI_API_TOKEN ? '***' : 'not set');