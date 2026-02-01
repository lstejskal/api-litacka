// Set required environment variable before requiring the module
process.env.LITACKA_API_URL = 'http://test-api.example.com';

const Litacka = require('../litacka');

// Mock fetch globally
global.fetch = jest.fn();

describe('Litacka Model', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUrl', () => {
    it('should construct correct URL with path', () => {
      const path = '/cards/123/validity';
      const url = Litacka.getUrl(path);
      expect(url).toBe('http://test-api.example.com/cards/123/validity');
    });

    it('should handle path without leading slash', () => {
      const url = Litacka.getUrl('cards/123');
      expect(url).toBe('http://test-api.example.comcards/123');
    });
  });

  describe('getValidity', () => {
    it('should fetch validity data successfully', async () => {
      const mockData = { validity_end: '2026-12-31T00:00:00' };
      const mockResponse = {
        status: 200,
        json: jest.fn().mockResolvedValue(mockData)
      };

      fetch.mockResolvedValue(mockResponse);

      const result = await Litacka.getValidity('1234567890');

      expect(fetch).toHaveBeenCalledWith('http://test-api.example.com/cards/1234567890/validity');
      expect(result).toEqual({
        status: 200,
        data: mockData
      });
    });
  });

  describe('getState', () => {
    it('should fetch state data successfully', async () => {
      const mockData = { state_description: 'Aktivní v držení klienta' };
      const mockResponse = {
        status: 200,
        json: jest.fn().mockResolvedValue(mockData)
      };

      fetch.mockResolvedValue(mockResponse);

      const result = await Litacka.getState('1234567890');

      expect(fetch).toHaveBeenCalledWith('http://test-api.example.com/cards/1234567890/state');
      expect(result).toEqual({
        status: 200,
        data: mockData
      });
    });
  });

  describe('getCompositeStatus', () => {
    it('should return 200 when both statuses are 200', () => {
      expect(Litacka.getCompositeStatus(200, 200)).toBe(200);
    });

    it('should return second status when first is 200 and second is not', () => {
      expect(Litacka.getCompositeStatus(200, 404)).toBe(404);
    });

    it('should return first status when second is 200 and first is not', () => {
      expect(Litacka.getCompositeStatus(500, 200)).toBe(500);
    });

    it('should return first status when both are not 200', () => {
      expect(Litacka.getCompositeStatus(404, 500)).toBe(404);
      expect(Litacka.getCompositeStatus(500, 404)).toBe(500);
    });
  });

  describe('getValidityAndState', () => {
    it('should fetch and combine validity and state data successfully', async () => {
      const validityData = { validity_end: '2026-12-31T00:00:00Z' };
      const stateData = { state_description: 'Aktivní v držení klienta' };

      const validityResponse = {
        status: 200,
        json: jest.fn().mockResolvedValue(validityData)
      };

      const stateResponse = {
        status: 200,
        json: jest.fn().mockResolvedValue(stateData)
      };

      fetch
        .mockResolvedValueOnce(validityResponse)
        .mockResolvedValueOnce(stateResponse);

      const result = await Litacka.getValidityAndState('1234567890');

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith('http://test-api.example.com/cards/1234567890/validity');
      expect(fetch).toHaveBeenCalledWith('http://test-api.example.com/cards/1234567890/state');

      expect(result).toEqual({
        status: 200,
        data: {
          validity_end: '31.12.2026',
          state_description: 'Aktivní v držení klienta'
        }
      });
    });

    it('should handle error', async () => {
      const validityData = { validity_end: '2026-12-31T00:00:00Z' };
      const stateData = { error: 'Server error' };

      const validityResponse = {
        status: 200,
        json: jest.fn().mockResolvedValue(validityData)
      };

      const stateResponse = {
        status: 500,
        json: jest.fn().mockResolvedValue(stateData)
      };

      fetch
        .mockResolvedValueOnce(validityResponse)
        .mockResolvedValueOnce(stateResponse);

      const result = await Litacka.getValidityAndState('1234567890');

      expect(result.status).toBe(500);
    });
  });
});
