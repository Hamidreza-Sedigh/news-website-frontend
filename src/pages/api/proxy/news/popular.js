import { withAuth } from '../middlewares/withAuth';
import { BACKEND_BASE_URL } from '../config/backend';

async function handler(req, res) {
  try {
    const limit = req.query.limit || 5;
    const period = req.query.period || 'day'; // اضافه شد: day / week / month

    // درخواست به بک‌اند با limit و period
    const response = await fetch(`${BACKEND_BASE_URL}/api/news/popular?limit=${limit}&period=${period}`);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Backend error: ${text}`);
    }
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error('Error in proxy/popular:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export default withAuth(handler);
