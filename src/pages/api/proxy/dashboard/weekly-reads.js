// pages/api/proxy/dashboard/weeklyReads.js
export default async function handler(req, res) {
  const BASE_URL = process.env.BACKEND_URL;
  const authHeader = req.headers.authorization || "";

  try {
    const response = await fetch(`${BASE_URL}/dashboard/weekly-reads`, {
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Backend error in weeklyReads:", text);
      return res.status(response.status).json({ message: "خطا در واکشی داده‌ها از بک‌اند" });
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.warn("❌ Invalid data from backend (weeklyReads):", data);
      return res.status(200).json([]);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error in /api/proxy/dashboard/weeklyReads:", error);
    res.status(500).json([]);
  }
}
