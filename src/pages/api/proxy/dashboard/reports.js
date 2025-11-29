// pages/api/proxy/dashboard/reports.js
export default async function handler(req, res) {
  const BASE_URL = process.env.BACKEND_URL;
  const token = req.headers.authorization || "";

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: token }),
  };

  try {
    let response;
    switch (req.method) {
      case "GET":
        response = await fetch(`${BASE_URL}/dashboard/reports`, { headers });
        break;

      case "PATCH":
        response = await fetch(`${BASE_URL}/dashboard/reports/${req.query.id}/read`, {
          method: "PATCH",
          headers,
        });
        break;

      case "DELETE":
        response = await fetch(`${BASE_URL}/dashboard/reports/${req.query.id}`, {
          method: "DELETE",
          headers,
        });
        break;

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Proxy /dashboard/reports error:", error);
    res.status(500).json({ error: "Proxy server error" });
  }
}
