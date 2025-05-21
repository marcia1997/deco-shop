module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::security',
    config: {
      origin: [
        'http://localhost:3000',
        'https://deco-shop-front.onrender.com',
        'https://deco-shop.onrender.com',
      ],
      credentials: true,
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
