export default async function handler(req, res) {
  const { sourceName, page = 1, pageSize = 10 } = req.query;

  if (!sourceName) {
    return res.status(400).json({ message: "پارامتر sourceName الزامی است." });
  }

  try {
    const response = await fetch(
      `http://localhost:8000/api/getOneSourceNews/${encodeURIComponent(sourceName)}?page=${page}&pageSize=${pageSize}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ message: "دریافت خبرهای منبع با خطا مواجه شد" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("خطا در proxy دریافت خبرهای منبع:", error);
    res.status(500).json({ message: "خطای داخلی سرور" });
  }
}
