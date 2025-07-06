// pages/api/proxy/news-sources.js
export default async function handler(req, res) {
  try {
    const response = await fetch('http://localhost:8000/api/getSources', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // اگر توکن یا هدر خاصی نیاز است اینجا اضافه کن:
        // Authorization: `Bearer ${process.env.API_TOKEN}`
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: 'خطا در دریافت منابع خبری' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('خطا در proxy منابع خبری:', error);
    res.status(500).json({ message: 'خطای سرور در proxy منابع خبری' });
  }
}
