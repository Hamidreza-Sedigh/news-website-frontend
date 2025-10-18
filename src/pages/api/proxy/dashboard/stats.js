// pages/api/proxy/dashboard/stats.js
export default async function handler(req, res) {
    const BACKEND_BASE_URL = process.env.BACKEND_URL || "http://localhost:8000";
    const token = req.headers.authorization; // توکن از فرانت میاد
  
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/dashboard/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: token }), // فقط اگه توکن بود اضافه کن
        },
      });
  
      const data = await response.json();
  
      return res.status(response.status).json(data);
    } catch (error) {
      console.error('خطا در proxy /dashboard/stats:', error);
      return res.status(500).json({ message: 'خطا در اتصال به سرور اصلی' });
    }
  }
  