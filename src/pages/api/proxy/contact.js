export default async function handler(req, res) {
  const token = req.headers.authorization;
  const baseUrl = process.env.BACKEND_URL || "http://localhost:8000";

  const url = `${baseUrl}/api/contact${req.query.id ? "/" + req.query.id : ""}${
    req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""
  }`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Proxy contact error:", error);
    res.status(500).json({ error: "Proxy failed" });
  }
}
