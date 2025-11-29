export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "فقط متد POST مجاز است." });
  }

  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "لطفاً همه فیلدها را پر کنید." });
  }

  try {
    const BASE_URL = process.env.BACKEND_URL;

    const backendRes = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.BACKEND_ACCESS_TOKEN}` در صورت نیاز
      },
      body: JSON.stringify(req.body),
    });

    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (err) {
    console.error("❌ Proxy /contact error:", err);
    res.status(500).json({ message: "خطا در اتصال به سرور اصلی." });
  }
}
