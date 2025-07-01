// middleware ساده برای آماده‌سازی پروژه
export function withAuth(handler) {
  return async (req, res) => {
    // فعلاً فقط لاگ می‌گیریم؛ در آینده می‌تونی توکن بررسی کنی
    console.log(`[${req.method}] ${req.url} called`);

    // به زودی: بررسی توکن از هدر، کوکی یا session
    // const token = req.headers.authorization;
    // if (!token) return res.status(401).json({ error: 'Unauthorized' });

    return handler(req, res);
  };
}
