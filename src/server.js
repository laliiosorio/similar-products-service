const buildApp = require('./app');
const { port } = require('./config/env');

const app = buildApp();

app.listen({ port, host: '0.0.0.0' }, (error, address) => {
  if (error) {
    app.log.error(error);
    process.exit(1);
  }

  app.log.info(`Server running at ${address}`);
});
