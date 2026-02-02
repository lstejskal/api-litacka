// Set environment variables before requiring the app
process.env.API_KEY = 'test-api-key';
process.env.LITACKA_API_URL = 'http://test-api.example.com';

const request = require('supertest');
const app = require('../app');

describe('API Integration Tests', () => {
  describe('GET /up', () => {
    it('should return OK with 200 status', async () => {
      const response = await request(app)
        .get('/up')
        .expect(200);

      expect(response.text).toBe('OK');
    });
  });

  describe('GET /cards/:cardNumber', () => {
    // Mock fetch for these integration tests
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return card data with valid API key', async () => {
      const validityData = { validity_end: '2016-08-12T00:00:00' };
      const stateData = { state_description: 'Aktivní v držení klienta' };

      const validityResponse = {
        status: 200,
        json: jest.fn().mockResolvedValue(validityData)
      };

      const stateResponse = {
        status: 200,
        json: jest.fn().mockResolvedValue(stateData)
      };

      global.fetch
        .mockResolvedValueOnce(validityResponse)
        .mockResolvedValueOnce(stateResponse);

      const response = await request(app)
        .get('/cards/12345')
        .set('X-API-Key', 'test-api-key')
        .expect(200);

      expect(response.body).toHaveProperty('validity_end');
      expect(response.body).toHaveProperty('state_description');
      expect(response.body.validity_end).toBe('12.8.2016');
      expect(response.body.state_description).toBe('Aktivní v držení klienta');
    });
  });

  it('should return 401 without API key', async () => {
    const response = await request(app)
      .get('/cards/123')
      .expect(401);

    expect(response.body).toEqual({ error: 'Unauthorized' });
  });

  it('should return 401 with invalid API key', async () => {
    const response = await request(app)
      .get('/cards/123')
      .set('X-API-Key', 'invalid-key')
      .expect(401);

    expect(response.body).toEqual({ error: 'Unauthorized' });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404)
    });
  });
});
