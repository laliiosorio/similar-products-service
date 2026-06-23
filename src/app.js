const fastify = require('fastify');
const productRoutes = require('./routes/product.routes');

function buildApp() {
  const app = fastify({
    logger: true,
  });

  app.get('/health', async () => {
    return { status: 'ok' };
  });

  app.register(productRoutes);

  return app;
}

module.exports = buildApp;
