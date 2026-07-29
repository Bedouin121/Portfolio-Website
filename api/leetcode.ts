import type { VercelRequest, VercelResponse } from '@vercel/node';

const LEETCODE_USERNAME = "hturjo121";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiUrl = `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`;

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; portfolio-bot/1.0)',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Upstream API returned ${response.status}`,
      });
    }

    const data = await response.json();

    if (!data.solvedProblem && data.solvedProblem !== 0) {
      return res.status(502).json({ error: 'Invalid data from upstream API' });
    }

    // Cache for 1 hour on Vercel CDN edge, stale-while-revalidate for 24h
    res.setHeader(
      'Cache-Control',
      's-maxage=3600, stale-while-revalidate=86400'
    );

    return res.status(200).json({
      solvedProblem: data.solvedProblem ?? 0,
      easySolved: data.easySolved ?? 0,
      mediumSolved: data.mediumSolved ?? 0,
      hardSolved: data.hardSolved ?? 0,
    });
  } catch (err) {
    console.error('[api/leetcode] fetch error:', err);
    return res.status(500).json({ error: 'Failed to fetch LeetCode data' });
  }
}
