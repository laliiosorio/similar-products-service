const AppError = require('../errors/app-error');

function errorHandler(error, request, reply) {
  request.log.error(error);

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      code: error.code,
      message: error.message,
    });
  }

  const code = 'INTERNAL_SERVER_ERROR';

  return reply.status(500).send({
    statusCode: 500,
    code,
    message: 'Unexpected error',
  });
}

module.exports = errorHandler;
