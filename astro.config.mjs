// @ts-check
     import { defineConfig } from 'astro/config';
     import tailwind from '@astrojs/tailwind';
     import dotenv from 'dotenv';

     dotenv.config();

     export default defineConfig({
       integrations: [tailwind()],
       image: {
         remotePatterns: [
           { protocol: 'https', hostname: '*.pexels.com' },
           { protocol: 'https', hostname: '*.unsplash.com' },
           { protocol: 'https', hostname: '*.githubusercontent.com' },
           { protocol: 'http', hostname: 'localhost' },
           { protocol: 'https', hostname: 'images.pexels.com' },
           { protocol: 'https', hostname: '*.supabase.co' },
           { protocol: 'https', hostname: 'strapibackend-062c.onrender.com' }
         ],
       },
     });