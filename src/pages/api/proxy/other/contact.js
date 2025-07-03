import { BACKEND_BASE_URL } from '../config/backend';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "فقط متد POST مجاز است." });
  }

  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "لطفاً همه فیلدها را پر کنید." });
  }

  try {
    
    const backendRes = await fetch(`${BACKEND_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer YOUR_SECRET_TOKEN`, // در صورت نیاز
      },
      body: JSON.stringify(req.body),
    });

    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ message: "خطا در اتصال به سرور اصلی." });
  }
}
