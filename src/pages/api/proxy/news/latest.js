//api/proxy/news/latest:
import { withAuth } from '../middlewares/withAuth';

async function handler(req, res) {
  try {
    const limit = req.query.limit || 30;
    const BASE_URL = process.env.BACKEND_URL;

    const response = await fetch(`${BASE_URL}/news/latest?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${process.env.BACKEND_ACCESS_TOKEN}`,
      },
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export default withAuth(handler);
