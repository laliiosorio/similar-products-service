require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT) || 5000,
  mockApiUrl: process.env.MOCK_API_URL || 'http://localhost:3001',
};
