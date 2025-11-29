//api/proxy/news/popular:
import { withAuth } from '../middlewares/withAuth';


async function handler(req, res) {
  try {
    const limit = req.query.limit || 5;
    const period = req.query.period || 'day'; // اضافه شد: day / week / month
    const BASE_URL = process.env.BACKEND_URL;


    // درخواست به بک‌اند با limit و period
    //const response = await fetch(`${BACKEND_BASE_URL}/api/news/popular?limit=${limit}&period=${period}`);
    const response = await fetch(`${BASE_URL}/news/popular?limit=${limit}&period=${period}`, {
      headers: {
        Authorization: `Bearer ${process.env.BACKEND_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Backend error: ${errorMessage}`);
      return res.status(response.status).json({ error: 'Backend error', details: errorMessage });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error('Error in proxy/news/popular:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export default withAuth(handler);
