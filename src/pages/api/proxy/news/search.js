import { withAuth } from '../middlewares/withAuth'; // اگر نیاز به احراز هویت داری
import { BACKEND_BASE_URL } from '../config/backend';

async function handler(req, res) {
  try {
    const { q, page = 1, pageSize = 10 } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'پارامتر q لازم است' });
    }

    const url = new URL(`${BACKEND_BASE_URL}/api/news/search`);
    url.searchParams.append('q', q);
    url.searchParams.append('page', page);
    url.searchParams.append('pageSize', pageSize);

    const response = await fetch(url.toString(), {
      headers: {
        // اگر توکن داری اینجا اضافه کن
        // Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export default withAuth(handler);
