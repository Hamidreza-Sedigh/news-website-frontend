export default async function handler(req, res) {
  try {
    const BASE_URL = process.env.BACKEND_URL;
    const token = req.headers.authorization;

    const idPart = req.query.id ? `/${req.query.id}` : "";
    const queryString = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    const url = `${BASE_URL}/contact${idPart}${queryString}`;

    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (error) {
    console.error("❌ Proxy contact error:", error);
    return res.status(500).json({ error: "Proxy failed" });
  }
}
