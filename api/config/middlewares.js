module.exports = ({ env }) => ({
  settings: {
    cors: {
      enabled: true,
      origin: [
        'https://deco-shop.onrender.com',
        'http://localhost:3000',
      ],
    },
  },
});
