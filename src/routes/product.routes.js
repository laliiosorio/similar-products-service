const productController = require('../controllers/product.controller');
const { similarProductsResponseSchema } = require('../schemas/product.schema');

const SIMILAR_PRODUCTS_ROUTE = '/product/:productId/similar';

async function productRoutes(app) {
  app.get(
    SIMILAR_PRODUCTS_ROUTE,
    {
      schema: similarProductsResponseSchema,
    },
    productController.getSimilarProducts,
  );
}

module.exports = productRoutes;
