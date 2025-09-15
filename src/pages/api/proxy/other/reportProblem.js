import { BACKEND_BASE_URL } from '../config/backend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'فقط متد POST مجاز است.' });
  }

  const { newsId, url, description } = req.body;

  if (!newsId || !url) {
    console.log("newsId:",newsId);
    console.log("url:",url);
    return res.status(400).json({ message: 'شناسه خبر و آدرس الزامی هستند.' });
  }

  try {
    const backendRes = await fetch(`${BACKEND_BASE_URL}/api/report-problem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer TOKEN` اگر لازم باشد
      },
      body: JSON.stringify({ newsId, url, description }),
    });

    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ message: 'خطا در اتصال به سرور اصلی.' });
  }
}
