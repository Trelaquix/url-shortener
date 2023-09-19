import {
    generateShortenedUrl,
    getOriginalUrl,
    goToOriginalUrl,
  } from '../../services/urlService';
  
  // Mock the fetch function
  global.fetch = require('jest-fetch-mock');
  
  describe('URL Service', () => {
    beforeEach(() => {
      // Reset the fetch mock before each test
      fetch.resetMocks();
    });
  
    describe('generateShortenedUrl', () => {
      it('generates a shortened URL and calls the correct endpoint', async () => {
        fetch.mockResponseOnce(JSON.stringify({ shortUrl: 'http://shortened.url' }));
  
        const longUrl = 'http://example.com';
        const shortenedUrl = await generateShortenedUrl(longUrl);
  
        expect(shortenedUrl).toBe('http://shortened.url');
        expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ longUrl }),
        });
      });
  
      it('throws an error on fetch failure', async () => {
        fetch.mockReject(new Error('Failed to shorten URL: Fetch error'));
  
        const longUrl = 'http://example.com';
  
        await expect(generateShortenedUrl(longUrl)).rejects.toThrowError(
          'Failed to shorten URL: Fetch error'
        );
      });
    });
  
    describe('getOriginalUrl', () => {
      it('retrieves the original URL and calls the correct endpoint', async () => {
        fetch.mockResponseOnce(JSON.stringify({ originalUrl: 'http://example.com' }));
  
        const shortUrl = 'http://localhost:3000/shortened';
  
        const originalUrl = await getOriginalUrl(shortUrl);
  
        expect(originalUrl).toBe('http://example.com');
        expect(fetch).toHaveBeenCalledWith(`http://localhost:4000/api/shortened`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
  
      it('throws an error on fetch failure', async () => {
        fetch.mockReject(new Error('Failed to retrieve original URL: Fetch error'));
  
        const shortUrl = 'http://localhost:3000/shortened';
  
        await expect(getOriginalUrl(shortUrl)).rejects.toThrowError(
          'Failed to retrieve original URL: Fetch error'
        );
      });
    });
  
    describe('goToOriginalUrl', () => {
      it('returns the original URL for a valid short URL and calls the correct endpoint', async () => {
        fetch.mockResponseOnce(JSON.stringify({ originalUrl: 'http://example.com' }));
  
        const shortUrl = 'http://localhost:3000/shortened';
  
        const originalUrl = await goToOriginalUrl(shortUrl);
  
        expect(originalUrl).toBe('http://example.com');
        expect(fetch).toHaveBeenCalledWith(`http://localhost:4000/api/shortened`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
      
  
      it('throws an error on fetch failure', async () => {
        fetch.mockReject(new Error('Failed to retrieve original URL: Fetch error'));
  
        const shortUrl = 'http://localhost:3000/shortened';
  
        await expect(goToOriginalUrl(shortUrl)).rejects.toThrowError(
          'Failed to retrieve original URL: Fetch error'
        );
      });
    });
  });
  