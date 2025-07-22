// Placeholder data for development and testing
export const PLACEHOLDER_SETTINGS = {
  catalog_type: 'cafe',
  logo: '/favicon.svg',
  background: '#ADD8E6',
  site_title: 'Demo Café',
  description: 'Welcome to our cozy café'
};

export const PLACEHOLDER_PRODUCTS = [
  {
    id: 1,
    name: 'Cappuccino',
    description: 'Rich espresso with steamed milk foam',
    price: 4.50,
    images: [
      { url: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    tags: [
      { name: 'Coffee' },
      { name: 'Hot' }
    ]
  },
  {
    id: 2,
    name: 'Chocolate Croissant',
    description: 'Buttery pastry filled with rich dark chocolate',
    price: 3.25,
    images: [
      { url: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    tags: [
      { name: 'Pastry' },
      { name: 'Sweet' }
    ]
  },
  {
    id: 3,
    name: 'Avocado Toast',
    description: 'Fresh avocado on artisan sourdough bread',
    price: 8.95,
    images: [
      { url: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    tags: [
      { name: 'Breakfast' },
      { name: 'Healthy' }
    ]
  },
  {
    id: 4,
    name: 'Iced Latte',
    description: 'Smooth espresso with cold milk over ice',
    price: 4.75,
    images: [
      { url: 'https://images.pexels.com/photos/907142/pexels-photo-907142.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    tags: [
      { name: 'Coffee' },
      { name: 'Cold' }
    ]
  },
  {
    id: 5,
    name: 'Mixed Gummy Bears',
    description: 'Assorted flavors of classic gummy bears',
    price: 2.99,
    images: [
      { url: 'https://images.pexels.com/photos/3776928/pexels-photo-3776928.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { url: 'https://images.pexels.com/photos/3776929/pexels-photo-3776929.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    tags: [
      { name: 'Candy' },
      { name: 'Gummy' }
    ]
  },
  {
    id: 6,
    name: 'Chocolate Truffles',
    description: 'Handcrafted premium chocolate truffles',
    price: 12.50,
    images: [
      { url: 'https://images.pexels.com/photos/3776318/pexels-photo-3776318.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { url: 'https://images.pexels.com/photos/3776319/pexels-photo-3776319.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    tags: [
      { name: 'Chocolate' },
      { name: 'Premium' }
    ]
  }
];

export const PLACEHOLDER_RESPONSE = {
  data: PLACEHOLDER_PRODUCTS,
  meta: {
    pagination: {
      page: 1,
      pageSize: 50,
      pageCount: 1,
      total: PLACEHOLDER_PRODUCTS.length
    }
  }
};