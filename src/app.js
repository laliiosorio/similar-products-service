const fastify = require('fastify');
const productRoutes = require('./routes/product.routes');
const errorHandler = require('./handlers/error-handler');

function buildApp(options = {}) {
  const app = fastify({
    logger: options.logger ?? true,
  });

  app.setErrorHandler(errorHandler);

  app.get('/health', async () => {
    return { status: 'ok' };
  });

  app.register(productRoutes);

  return app;
}

module.exports = buildApp;
