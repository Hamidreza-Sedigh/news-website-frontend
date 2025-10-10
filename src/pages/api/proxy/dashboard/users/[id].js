// pages/api/proxy/dashboard/users/[id].js

export default async function handler(req, res) {
  const { id } = req.query;

  // آدرس بک‌اند اصلی‌ات (جایی که API واقعی هست)
  const backendUrl = `http://localhost:8000/api/dashboard/users/${id}`;

  // توکن از هدر یا کوکی یا هرجایی که ذخیره کردی گرفته میشه
  const token = req.headers.authorization;

  try {
    // ----- GET: دریافت اطلاعات کاربر -----
    if (req.method === "GET") {
      const response = await fetch(backendUrl, {
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // ----- PUT: ویرایش اطلاعات کاربر -----
    if (req.method === "PUT") {
      const response = await fetch(backendUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // اگر متد غیرمجاز بود
    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("خطا در پراکسی کاربران:", error);
    return res.status(500).json({ message: "Server error in proxy" });
  }
}
