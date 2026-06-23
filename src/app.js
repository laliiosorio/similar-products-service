const fastify = require('fastify');
const productRoutes = require('./routes/product.routes');
const errorHandler = require('./handlers/error-handler');

function buildApp() {
  const app = fastify({
    logger: true,
  });

  app.setErrorHandler(errorHandler);

  app.get('/health', async () => {
    return { status: 'ok' };
  });

  app.register(productRoutes);

  return app;
}

module.exports = buildApp;
