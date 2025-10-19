// pages/api/proxy/dashboard/weeklyReads.js
import { BACKEND_BASE_URL } from '../config/backend';

export default async function handler(req, res) {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/dashboard/weekly-reads`, {
        headers: {
          Authorization: req.headers.authorization || "",
        },
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error("خطا از بک‌اند در weeklyReads:", text);
        return res.status(response.status).json({ message: "خطا در واکشی داده‌ها از بک‌اند" });
      }
  
      const data = await response.json();
  
      // ✅ اطمینان از اینکه داده همیشه آرایه است (حتی اگر بک‌اند خراب باشد)
      if (!Array.isArray(data)) {
        console.warn("داده نامعتبر از بک‌اند (weeklyReads):", data);
        return res.status(200).json([]);
      }
  
      res.status(200).json(data);
    } catch (error) {
      console.error("خطا در proxy weeklyReads:", error);
      res.status(500).json([]);
    }
  }
  