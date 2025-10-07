// pages/api/proxy/news/view.js
import { BACKEND_BASE_URL } from '../config/backend';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { newsId } = req.body;
    const authHeader = req.headers.authorization || ""; // ممکنه Bearer داشته باشه

    // ارسال درخواست به بک‌اند
    const response = await fetch(`${BACKEND_BASE_URL}/api/news/${newsId}/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, // عبور توکن
      },
      body: JSON.stringify({ newsId }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Error in /api/proxy/news/view:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
