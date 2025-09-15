//api/proxy/news/latest:
import { withAuth } from '../middlewares/withAuth';
import { BACKEND_BASE_URL } from '../config/backend';

async function handler(req, res) {
  try {
    const limit = req.query.limit || 30;
    const response = await fetch(`${BACKEND_BASE_URL}/api/news/latest?limit=${limit}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export default withAuth(handler);
