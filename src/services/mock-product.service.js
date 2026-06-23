const httpClient = require('../config/http-client');
const { mockApiUrl } = require('../config/env');
const { productCache, similarIdsCache } = require('../constants/cache');
const AppError = require('../errors/app-error');

async function getSimilarIds(productId) {
  if (similarIdsCache.has(productId)) {
    console.log('CACHE HIT SIMILAR IDS', productId);
    return similarIdsCache.get(productId);
  }

  try {
    const response = await httpClient.get(`${mockApiUrl}/product/${productId}/similarids`);
    similarIdsCache.set(productId, response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
    }

    throw new AppError('Mock API unavailable', 503, 'MOCK_API_ERROR');
  }
}

async function getProductById(productId) {
  if (productCache.has(productId)) {
    console.log('CACHE HIT PRODUCT', productId);
    return productCache.get(productId);
  }

  try {
    const response = await httpClient.get(`${mockApiUrl}/product/${productId}`);
    productCache.set(productId, response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new AppError('Similar product not found', 404, 'SIMILAR_PRODUCT_NOT_FOUND');
    }

    throw new AppError('Mock API unavailable', 503, 'MOCK_API_ERROR');
  }
}

module.exports = {
  getSimilarIds,
  getProductById,
};
