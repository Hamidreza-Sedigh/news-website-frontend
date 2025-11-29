// ✅ pages/api/proxy/dashboard/users/[id].js
export default async function handler(req, res) {
  const { id } = req.query;
  const BASE_URL = process.env.BACKEND_URL;
  const token = req.headers.authorization || "";

  const backendUrl = `${BASE_URL}/dashboard/users/${id}`;

  try {
    // ------------------------ GET ------------------------
    if (req.method === "GET") {
      const response = await fetch(backendUrl, {
        headers: { Authorization: token },
      });

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        return res.status(response.status).json(data);
      } catch {
        return res.status(500).json({ message: "Invalid JSON from backend" });
      }
    }

    // ------------------------ PUT ------------------------
    if (req.method === "PUT") {
      const response = await fetch(backendUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // ------------------------ DELETE ------------------------
    if (req.method === "DELETE") {
      const response = await fetch(backendUrl, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        return res.status(response.status).json(data);
      } catch {
        return res.status(500).json({ message: "Invalid JSON from backend" });
      }
    }

    // ------------------------ DEFAULT ------------------------
    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("❌ Error in /api/proxy/dashboard/users/[id]:", error);
    return res.status(500).json({ message: "Server error in proxy" });
  }
}
