require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT) || 5000,
};