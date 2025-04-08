module.exports = ({ env }) => ({
  url: env('PUBLIC_URL', 'https://deco-shop.onrender.com'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    url: '/admin',
  },
});

