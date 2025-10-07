import { BACKEND_BASE_URL } from '../config/backend';

export default async function handler(req, res) {
  try {
    const authHeader = req.headers.authorization || "";

    const response = await fetch(`${BACKEND_BASE_URL}/api/dashboard/history`, {
      headers: {
        Authorization: authHeader,
      },
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Error in /api/proxy/dashboard/history:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
