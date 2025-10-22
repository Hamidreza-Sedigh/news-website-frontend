// pages/api/proxy/user/me.js
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000/api";

export default async function handler(req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "توکن یافت نشد" });
  }

  try {
    let backendUrl = `${BACKEND_URL}/auth/me`;

    const options = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    if (req.method === "PUT") {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(backendUrl, options);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (err) {
    console.error("Proxy /users/me error:", err);
    res.status(500).json({ error: "خطا در ارتباط با سرور" });
  }
}
