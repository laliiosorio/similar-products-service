const productController = require('../controllers/product.controller');

async function productRoutes(app) {
  app.get('/product/:productId/similar', productController.getSimilarProducts);
}

module.exports = productRoutes;
