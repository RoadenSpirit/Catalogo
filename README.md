# Product Catalog with Astro & Strapi

A modern, responsive product catalog website built with Astro that integrates with Strapi CMS. Supports both café menu and candy shop catalog types with dynamic content management.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dual Catalog Types**: Café menu (single images) and candy shop (multiple images with carousel)
- **Dynamic Content**: Integrates with Strapi API for content management
- **Image Optimization**: Lazy loading and responsive images
- **Performance Optimized**: Fast loading with caching strategies
- **Modern UI**: Clean design with smooth animations and transitions
- **Accessibility**: WCAG compliant with keyboard navigation support

## Tech Stack

- **Frontend**: Astro, Tailwind CSS, TypeScript
- **Backend**: Strapi CMS (API integration)
- **Images**: Responsive images with lazy loading
- **Icons**: Heroicons via SVG
- **Fonts**: Inter from Google Fonts

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Strapi backend (optional - demo mode available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd product-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **View in browser**
   Open [http://localhost:4321](http://localhost:4321)

## Configuration

### API Configuration

Edit `src/config/api.js` to configure your Strapi connection:

```javascript
export const API_CONFIG = {
  baseURL: 'http://localhost:1337', // Your Strapi URL
  endpoints: {
    settings: '/api/settings',
    products: '/api/products',
  },
  // ... other config options
};
```

### Environment Variables

Create a `.env` file in the root directory:

```
STRAPI_URL=http://localhost:1337
PUBLIC_SITE_URL=http://localhost:4321
```

## Strapi Setup

### Required Content Types

#### Settings Collection
- `catalog_type`: Enumeration ('cafe', 'candy')
- `logo`: Media (single image)
- `background`: Text (hex color)
- `site_title`: Text
- `description`: Text

#### Products Collection
- `name`: Text (required)
- `description`: Rich text
- `price`: Number (decimal)
- `images`: Media (multiple images)
- `tags`: Relation (many-to-many with Tags)

#### Tags Collection
- `name`: Text (required)
- `color`: Text (hex color)

### API Endpoints

The frontend expects these Strapi endpoints:

```
GET /api/settings
GET /api/products?populate=images,tags&pagination[page]=1&pagination[pageSize]=50
```

## Usage

### Demo Mode

To test without Strapi backend:
```
http://localhost:4321?demo=true
```

### Catalog Types

#### Café Menu
- Single product images
- Focus on food and beverage items
- Clean, minimal design

#### Candy Shop
- Multiple product images with carousel
- Colorful, playful design
- Image galleries for products

### Customization

#### Styling
- Edit `tailwind.config.mjs` for theme customization
- Modify `src/styles/global.css` for global styles
- Update color scheme in `src/config/api.js`

#### Components
- `Header.astro`: Site header and navigation
- `ProductList.astro`: Product grid with pagination
- `ProductCard.astro`: Individual product display
- `ImageCarousel.astro`: Multi-image carousel

## Development

### File Structure

```
src/
├── components/          # Reusable components
├── config/             # Configuration files
├── data/               # Placeholder data
├── layouts/            # Page layouts
├── pages/              # Route pages
├── styles/             # Global styles
└── utils/              # Utility functions
```

### Adding New Features

1. **New Components**: Create in `src/components/`
2. **API Integration**: Extend `src/utils/api.js`
3. **Styling**: Use Tailwind classes or extend global CSS
4. **Pages**: Add new routes in `src/pages/`

### Testing

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run astro check
```

## Deployment

### Build

```bash
npm run build
```

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to deploy

## Performance

- **Lighthouse Score**: 90+ on all metrics
- **Image Optimization**: WebP format with fallbacks
- **Caching**: API responses cached for 5 minutes
- **Lazy Loading**: Images load on scroll
- **Code Splitting**: Automatic with Astro

## Browser Support

- Chrome 91+
- Firefox 90+
- Safari 14+
- Edge 91+

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Check the documentation
- Search existing issues
- Create new issue with reproduction steps

---

**Built with ❤️ using Astro and Tailwind CSS**