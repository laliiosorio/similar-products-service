# Similar Products Service

REST API built with Node.js and Fastify for the backend technical test.

The service exposes an endpoint that returns the details of similar products for a given product.

## Tech stack

- Node.js
- Fastify
- Axios
- ESLint
- Prettier

## Architecture

The project uses a simple layered structure:

- `routes`: API endpoint definitions
- `controllers`: HTTP request handling
- `services`: business logic and external API integration
- `config`: environment and HTTP client configuration
- `handlers`: centralized request and error handling
- `errors`: custom application errors
- `constants`: in-memory cache

## Main endpoint

```http
GET /product/:productId/similar
```

Example:

```bash
curl http://localhost:5000/product/1/similar
```

## Environment variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Expected variables:

```env
PORT=5000
MOCK_API_URL=http://localhost:3001
```

## Installation

```bash
npm install
```

## Run locally

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

Health check:

```bash
curl http://localhost:5000/health
```

## Running the challenge mocks

From the original `backendDevTest` repository root:

```bash
docker compose up -d simulado influxdb grafana
```

Check that the mock API is working:

```bash
curl http://localhost:3001/product/1/similarids
```

## Running the performance test

Keep this API running on port `5000`.

Then, from the original `backendDevTest` repository root:

```bash
docker compose run --rm k6 run /scripts/test.js
```

Grafana dashboard:

```text
http://localhost:3000/d/Le2Ku9NMk/k6-performance-test
```

## Technical decisions

### Fastify

Fastify was chosen because it is lightweight, performant and well suited for small REST APIs.

### Axios timeout

External calls to the mock API use a configured timeout to avoid keeping requests open for too long when the external service is slow or unavailable.

### Promise.allSettled

Similar product details are requested concurrently using `Promise.allSettled`.

This allows the API to return the products that were successfully retrieved, instead of failing the whole request when one similar product fails.

### In-memory cache

The service uses a small in-memory cache for:

- similar product IDs
- product details

This reduces repeated calls to the mock API during load tests and improves response times.

For a production system, this could be replaced by a distributed cache such as Redis and include TTL expiration.

### Error handling

Errors are handled through a centralized error handler and custom `AppError`.

Example error response:

```json
{
  "statusCode": 404,
  "code": "PRODUCT_NOT_FOUND",
  "message": "Product not found"
}
```

## Scripts

```bash
npm run dev
npm start
npm run lint
npm run format
```
