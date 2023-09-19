export async function generateShortenedUrl(longUrl) {
  const response = await fetch('http://localhost:4000/api/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ longUrl }),
});

  if (!response.ok) {
    throw new Error(`Failed to shorten URL: ${response.statusText}`);
  }

  const data = await response.json();
  return data.shortUrl;
}

export async function getOriginalUrl(shortUrl) {
  const sanitizedShortUrl = shortUrl.replace('http://localhost:3000/', '');
  const response = await fetch(`http://localhost:4000/api/${sanitizedShortUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to retrieve original URL: ${response.statusText}`);
  }

  const data = await response.json();
  return data.originalUrl;
}

export async function goToOriginalUrl(shortUrl) {
  const tmpUrl = new URL(shortUrl);
  if(!tmpUrl.pathname || tmpUrl.pathname.length <= 1) {
    return false;
  }
  const pathname = tmpUrl.pathname.substring(1);
  const response = await fetch(`http://localhost:4000/api/${pathname}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to retrieve original URL: ${response.statusText}`);
  }

  const data = await response.json();
  return data.originalUrl;
}

