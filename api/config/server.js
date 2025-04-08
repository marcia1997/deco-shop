module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 'https://deco-shop-front.onrender.com'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
