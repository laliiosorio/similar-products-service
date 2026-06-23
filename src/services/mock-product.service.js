const axios = require('axios');
const { mockApiUrl } = require('../config/env');
const AppError = require('../errors/app-error');

async function getSimilarIds(productId) {
  try {
    const response = await axios.get(`${mockApiUrl}/product/${productId}/similarids`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
    }

    throw new AppError('Mock API unavailable', 503, 'MOCK_API_ERROR');
  }
}

async function getProductById(productId) {
  try {
    const response = await axios.get(`${mockApiUrl}/product/${productId}`);
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
