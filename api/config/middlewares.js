module.exports = [
  'strapi::errors',
  'strapi::security',
  
  {
    name: 'strapi::cors',
    
    config: {
      origin: [
        'http://localhost:3000',
        'https://deco-shop-front.onrender.com',
        'https://deco-shop.onrender.com',
      ],
      credentials: true,
    },
    
  },
   'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',

];
