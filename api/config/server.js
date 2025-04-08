module.exports = ({ env }) => ({
  url: env('PUBLIC_URL', 'https://deco-shop.onrender.com'),  
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    url: '/admin',
  },
});

