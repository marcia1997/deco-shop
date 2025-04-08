module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  cors: {
    origin: ['http://localhost:3000', 'https://deco-shop-front.onrender.com'],
    credentials: true,
  },
});

