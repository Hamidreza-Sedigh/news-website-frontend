export default async function handler(req, res) {
    const { pageNumber = 0, pageSize = 10 } = req.query;
  
    // مسیر بک‌اند اصلی
    const backendUrl = `http://localhost:8000/api/dashboard/users/paginated?` +
                       `pageNumber=${pageNumber}&pageSize=${pageSize}`;
  
    const token = req.headers.authorization;
  
    try {
      // فقط GET برای دریافت کاربران با صفحه‌بندی
      if (req.method === "GET") {
        const response = await fetch(backendUrl, {
          headers: {
            Authorization: token,
          },
        });
  
        // بررسی وضعیت پاسخ
        if (!response.ok) {
          const errorText = await response.text();
          return res.status(response.status).send(errorText);
        }
  
        const data = await response.json();
  
        // فرض: بک‌اند داده‌های صفحه‌بندی شده به شکل { users: [...], totalCount: X } می‌دهد
        return res.status(200).json(data);
      }
  
      return res.status(405).json({ message: "Method not allowed" });
    } catch (error) {
      console.error("خطا در پراکسی کاربران صفحه‌بندی:", error);
      return res.status(500).json({ message: "Server error in proxy" });
    }
  }
  