const productService = require('../services/product.service');

async function getSimilarProducts(request) {
  const { productId } = request.params;

  return productService.getSimilarProducts(productId);
}

module.exports = {
  getSimilarProducts,
};
