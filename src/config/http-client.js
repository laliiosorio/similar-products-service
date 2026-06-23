const axios = require('axios');

const httpClient = axios.create({
  timeout: 1000,
});

module.exports = httpClient;
