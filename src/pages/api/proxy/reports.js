export default async function handler(req, res) {
  const BASE_URL = process.env.BACKEND_URL || "http://localhost:8000";
  const token = req.headers.authorization; // bearer token

  const headers = {
    "Content-Type": "application/json",
    Authorization: token || "",
  };

  try {
    console.log("Incoming token:", req.headers.authorization);

    let response;

    switch (req.method) {
      case "GET": {
        const url = `${BASE_URL}/dashboard/reports${
          req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""
        }`;

        response = await fetch(url, { headers });
        break;
      }

      case "PATCH": {
        if (!req.query.id) {
          return res.status(400).json({ error: "Missing ID parameter" });
        }
        const url = `${BASE_URL}/dashboard/reports/${req.query.id}/read`;

        response = await fetch(url, {
          method: "PATCH",
          headers,
        });
        break;
      }

      case "DELETE": {
        if (!req.query.id) {
          return res.status(400).json({ error: "Missing ID parameter" });
        }
        const url = `${BASE_URL}/dashboard/reports/${req.query.id}`;

        response = await fetch(url, {
          method: "DELETE",
          headers,
        });
        break;
      }

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Proxy /reports error:", error);
    res.status(500).json({ error: "Proxy server error" });
  }
}
