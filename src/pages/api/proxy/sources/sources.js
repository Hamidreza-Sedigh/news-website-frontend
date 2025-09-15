// pages/api/proxy/news-sources.js
import { withAuth } from '../middlewares/withAuth';
import { BACKEND_BASE_URL } from '../config/backend';

async function handler(req, res) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/sources/getSources`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err);
    
    res.status(500).json({ error: 'خطا در دریافت منابع خبری' });
  }
}

export default withAuth(handler);
