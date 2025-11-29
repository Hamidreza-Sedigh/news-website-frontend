export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const BASE_URL = process.env.BACKEND_URL;
    const { newsId } = req.body;
    const authHeader = req.headers.authorization || "";

    const response = await fetch(`${BASE_URL}/news/${newsId}/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({ newsId }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Error in /api/proxy/news/view:", err);
    res.status(500).json({ error: "Server error" });
  }
}
