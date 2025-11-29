//pages/api/proxy/dashboard/users/paginated.js
export default async function handler(req, res) {
  const { pageNumber = 0, pageSize = 10 } = req.query;
  const BASE_URL = process.env.BACKEND_URL;
  const token = req.headers.authorization || "";

  const backendUrl = `${BASE_URL}/dashboard/users/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  try {
    if (req.method === "GET") {
      const response = await fetch(backendUrl, {
        headers: { Authorization: token },
      });

      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).send(errorText);
      }

      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("❌ Error in /api/proxy/dashboard/users/paginated:", error);
    return res.status(500).json({ message: "Server error in proxy" });
  }
}
