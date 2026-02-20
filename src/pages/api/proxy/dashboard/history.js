// pages/api/proxy/dashboard/history.js
export default async function handler(req, res) {
  try {
    const BASE_URL = process.env.BACKEND_URL;
    const authHeader = req.headers.authorization || "";

    // -------------------------
    // GET - دریافت تاریخچه
    // -------------------------
    if (req.method === "GET") {
      const response = await fetch(`${BASE_URL}/dashboard/history`, {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // -------------------------
    // DELETE - حذف آیتم
    // -------------------------
    if (req.method === "DELETE") {
      const response = await fetch(`${BASE_URL}/dashboard/history`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // -------------------------
    // Method not allowed
    // -------------------------
    return res.status(405).json({ error: "Method Not Allowed" });

  } catch (err) {
    console.error("❌ Error in /api/proxy/dashboard/history:", err);
    res.status(500).json({ error: "Server error" });
  }
}