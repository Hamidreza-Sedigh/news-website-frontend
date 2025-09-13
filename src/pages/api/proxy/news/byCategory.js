// pages/api/proxy/news/byCategory.js
import { withAuth } from "../middlewares/withAuth";
import { BACKEND_BASE_URL } from "../config/backend";

async function handler(req, res) {
  try {
    const { category, page = 1, pageSize = 10 } = req.query;

    if (!category) {
      return res.status(400).json({ error: "پارامتر category الزامی است" });
    }

    const response = await fetch(
      `${BACKEND_BASE_URL}/api/news?category=${encodeURIComponent(
        category
      )}&page=${page}&pageSize=${pageSize}`
    );

    if (!response.ok) {
      throw new Error(`خطا در درخواست بک‌اند: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error in byCategory proxy:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export default withAuth(handler);
