// pages/api/proxy/history.js
export default async function handler(req, res) {
  try {
    const BASE_URL = process.env.BACKEND_URL;
    const authHeader = req.headers.authorization || "";

    const response = await fetch(`${BASE_URL}/dashboard/history`, {
      headers: {
        Authorization: authHeader,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Error in /api/proxy/dashboard/history:", err);
    res.status(500).json({ error: "Server error" });
  }
}
