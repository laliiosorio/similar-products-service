const axios = require('axios');

const httpClient = axios.create({
  timeout: 1500,
});

module.exports = httpClient;
