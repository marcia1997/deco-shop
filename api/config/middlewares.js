module.exports = ({ env }) => [
  'strapi::errors',
  'strapi::security',
  'strapi::cors', // <- este es el que vamos a configurar
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://wecooking-front-e9qg.onrender.com', 
        'http://localhost:3000',                   
        'https://deco-shop.onrender.com',            
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      headers: '*',
      credentials: true,
    },
  },
];
