// pages/api/proxy/user/register.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const BASE_URL = process.env.BACKEND_URL;

    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (err) {
    console.error("❌ Proxy register error:", err);
    res.status(500).json({ error: "خطا در ارتباط با سرور" });
  }
}
