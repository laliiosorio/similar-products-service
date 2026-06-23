const mockProductService = require('./mock-product.service');

async function getSimilarProducts(productId) {
  const similarIds = await mockProductService.getSimilarIds(productId);

  const products = await Promise.all(
    similarIds.map((similarId) => mockProductService.getProductById(similarId)),
  );

  return products;
}

module.exports = {
  getSimilarProducts,
};
