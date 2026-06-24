const assert = require('node:assert/strict');
const test = require('node:test');

const buildApp = require('../src/app');
const AppError = require('../src/errors/app-error');
const mockProductService = require('../src/services/mock-product.service');

const originalGetSimilarIds = mockProductService.getSimilarIds;
const originalGetProductById = mockProductService.getProductById;

test.afterEach(() => {
  mockProductService.getSimilarIds = originalGetSimilarIds;
  mockProductService.getProductById = originalGetProductById;
});

test('GET /product/:productId/similar returns similar products', async () => {
  mockProductService.getSimilarIds = async () => ['2', '3'];
  mockProductService.getProductById = async (productId) => ({
    id: productId,
    name: `Product ${productId}`,
    price: 10,
    availability: true,
    ignoredField: 'not exposed',
  });

  const app = buildApp({ logger: false });
  const response = await app.inject('/product/1/similar');

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), [
    {
      id: '2',
      name: 'Product 2',
      price: 10,
      availability: true,
    },
    {
      id: '3',
      name: 'Product 3',
      price: 10,
      availability: true,
    },
  ]);

  await app.close();
});

test('GET /product/:productId/similar returns 404 when product does not exist', async () => {
  mockProductService.getSimilarIds = async () => {
    throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
  };

  const app = buildApp({ logger: false });
  const response = await app.inject('/product/999/similar');

  assert.equal(response.statusCode, 404);
  assert.deepEqual(response.json(), {
    statusCode: 404,
    code: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
  });

  await app.close();
});
