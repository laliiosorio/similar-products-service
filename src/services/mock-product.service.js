const axios = require('axios');
const { mockApiUrl } = require('../config/env');

async function getSimilarIds(productId) {
  const response = await axios.get(`${mockApiUrl}/product/${productId}/similarids`);
  return response.data;
}

async function getProductById(productId) {
  const response = await axios.get(`${mockApiUrl}/product/${productId}`);
  return response.data;
}

module.exports = {
  getSimilarIds,
  getProductById,
};
