const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    price: { type: 'number' },
    availability: { type: 'boolean' },
  },
  required: ['id', 'name', 'price', 'availability'],
};

const similarProductsResponseSchema = {
  response: {
    200: {
      type: 'array',
      items: productSchema,
    },
  },
};

module.exports = {
  similarProductsResponseSchema,
};
