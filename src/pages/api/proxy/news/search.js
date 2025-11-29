//api/proxy/news/search
import { withAuth } from "../middlewares/withAuth";

async function handler(req, res) {
  try {
    const BASE_URL = process.env.BACKEND_URL;
    const { q, page = 1, pageSize = 10 } = req.query;

    if (!q) {
      return res.status(400).json({ error: "پارامتر q لازم است" });
    }

    const url = new URL(`${BASE_URL}/news/search`);
    url.searchParams.append("q", q);
    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", pageSize);

    const response = await fetch(url.toString(), {
      headers: {
        // Authorization: `Bearer ${token}` اگر نیاز بود
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error in /api/proxy/news/search:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export default withAuth(handler);
