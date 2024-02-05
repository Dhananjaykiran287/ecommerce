const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

beforeEach(async () => {
  // Clear the database before each test
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  // Close the MongoDB connection after all tests
  await mongoose.connection.close();
});

describe('Product CRUD Operations', () => {
  let productId;

  test('should create a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'Test description',
        price: 19.99,
      })
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    productId = response.body._id;
  });

  test('should get all products', async () => {
    await request(app).get('/api/products/').expect(200);
  });

  test('should get a specific product by ID', async () => {
    await request(app).get(`/api/products/${productId}`).expect(200);
  });

 
});

describe('Product Variant Operations', () => {
  let productId;
  let variantId;

  beforeEach(async () => {
    const productResponse = await request(app)
      .post('/api/products')
      .send({
        name: 'Product with Variant',
        description: 'Test description',
        price: 29.99,
      })
      .expect(201);

    productId = productResponse.body._id;

    const variantResponse = await request(app)
      .post(`/api/products/${productId}/variants`)
      .send({
        name: 'Large',
        sku: 'L123',
        additionalCost: 5.0,
        stockCount: 10,
      })
      .expect(201);

    variantId = variantResponse.body.variants[0]._id;
  });

  test('should add a variant to a product', async () => {
    await request(app)
      .post(`/api/products/${productId}/variants`)
      .send({
        name: 'Medium',
        sku: 'M123',
        additionalCost: 3.0,
        stockCount: 15,
      })
      .expect(201);
  });

  test('should update a variant by variant ID', async () => {
    await request(app)
      .put(`/api/products/${productId}/variants/${variantId}`)
      .send({
        name: 'X-Large',
        additionalCost: 8.0,
      })
      .expect(200);
  });

  
});


describe('Product Search API', () => {
  test('should search products by name, description, and variant name', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'Test description',
        price: 19.99,
        variants: [{ name: 'Test Variant', sku: '12345', additionalCost: 5, stockCount: 10 }],
      });

    const productId = response.body._id;

    const searchResponse = await request(app)
      .get(`/api/products/search?query=Test`)
      .expect(200);

    expect(searchResponse.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: productId,
          name: 'Test Product',
          description: 'Test description',
          variants: expect.arrayContaining([
            expect.objectContaining({
              name: 'Test Variant',
            }),
          ]),
        }),
      ])
    );
  });

});