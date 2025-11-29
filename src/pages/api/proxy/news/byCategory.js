// pages/api/proxy/news/byCategory.js
import { withAuth } from "../middlewares/withAuth";

async function handler(req, res) {
  try {
    const BASE_URL = process.env.BACKEND_URL;
    const { category, page = 1, pageSize = 10 } = req.query;

    if (!category) {
      return res.status(400).json({ error: "پارامتر category الزامی است" });
    }

    const response = await fetch(
      `${BASE_URL}/news?category=${encodeURIComponent(category)}&page=${page}&pageSize=${pageSize}`
    );

    if (!response.ok) {
      throw new Error(`خطا در درخواست بک‌اند: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error in /api/proxy/news/byCategory:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export default withAuth(handler);
