// pages/api/proxy/dashboard/stats.js
export default async function handler(req, res) {
  const BASE_URL = process.env.BACKEND_URL;
  const token = req.headers.authorization || "";

  try {
    const response = await fetch(`${BASE_URL}/dashboard/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Error in /api/proxy/dashboard/stats:", error);
    res.status(500).json({ message: "خطا در اتصال به سرور اصلی" });
  }
}
