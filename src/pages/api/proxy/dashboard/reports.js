// pages/api/proxy/reports.js
export default async function handler(req, res) {
  const BASE_URL = process.env.BACKEND_URL || "http://localhost:8000";

  const token = req.headers.authorization; // bearer token

  const headers = {
    "Content-Type": "application/json",
    Authorization: token || "",
  };

  try {
    let response;
    switch (req.method) {
      case "GET":
        response = await fetch(`${BASE_URL}/api/dashboard/reports`, { headers });
        break;

      case "PATCH":
        response = await fetch(`${BASE_URL}/api/dashboard/reports/${req.query.id}/read`, {
          method: "PATCH",
          headers,
        });
        break;

      case "DELETE":
        response = await fetch(`${BASE_URL}/api/dashboard/reports/${req.query.id}`, {
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
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy server error" });
  }
}
