const mockProductService = require('./mock-product.service');

async function getSimilarProducts(productId) {
  const similarIds = await mockProductService.getSimilarIds(productId);

  const results = await Promise.allSettled(
    similarIds.map((similarId) => mockProductService.getProductById(similarId)),
  );

  return results.filter((result) => result.status === 'fulfilled').map((result) => result.value);
}

module.exports = {
  getSimilarProducts,
};
