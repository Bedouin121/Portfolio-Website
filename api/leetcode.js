// api/leetcode.js
// Vercel serverless function to proxy LeetCode data requests

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    // Note: You might need to rotate/find a more stable unofficial endpoint or
    // implement the full GraphQL query here.
    // This maintains the existing dependency on the same underlying data source
    // but moves the request to the server, solving CORS and potential client-side issues.
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);

    if (!response.ok) {
      throw new Error('Failed to fetch from LeetCode provider');
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Proxy Error:', error);
    return res.status(500).json({ error: 'Failed to fetch LeetCode data' });
  }
}
