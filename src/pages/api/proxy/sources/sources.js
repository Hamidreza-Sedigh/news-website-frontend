// pages/api/proxy/news-sources.js
import { withAuth } from '../middlewares/withAuth';

async function handler(req, res) {
  try {
    const BASE_URL = process.env.BACKEND_URL;
    const response = await fetch(`${BASE_URL}/sources/getSources`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Proxy /news-sources error:", err);
    res.status(500).json({ error: "خطا در دریافت منابع خبری" });
  }
}

export default withAuth(handler);
