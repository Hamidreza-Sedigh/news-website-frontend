// pages/api/proxy/user/register.js
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000/api';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
  
      res.status(response.status).json(data);
    } catch (err) {
      console.error('Proxy register error:', err);
      res.status(500).json({ error: 'خطا در ارتباط با سرور' });
    }
  }
  