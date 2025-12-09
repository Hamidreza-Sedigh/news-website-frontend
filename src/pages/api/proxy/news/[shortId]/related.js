import { withAuth } from '../../middlewares/withAuth';

async function handler(req, res) {
  const { shortId } = req.query;
  const BASE_URL = process.env.BACKEND_URL;

  try {
    const response = await fetch(`${BASE_URL}/news/${shortId}/related`, {
      headers: {
        // Authorization: `Bearer ${process.env.BACKEND_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy related news error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

export default withAuth(handler);
