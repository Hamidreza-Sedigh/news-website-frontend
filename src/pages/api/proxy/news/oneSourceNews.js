//api/proxy/news/oneSourceNews
import { withAuth } from "../middlewares/withAuth";

export default async function handler(req, res) {
  const BASE_URL = process.env.BACKEND_URL;
  const { sourceName, page = 1, pageSize = 10 } = req.query;

  if (!sourceName) {
    return res.status(400).json({ message: "پارامتر sourceName الزامی است." });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/news/getOneSourceNews/${encodeURIComponent(sourceName)}?page=${page}&pageSize=${pageSize}`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "دریافت خبرهای منبع با خطا مواجه شد" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error in /api/proxy/news/oneSourceNews:", error);
    res.status(500).json({ message: "خطای داخلی سرور" });
  }
}
