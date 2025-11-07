// pages/api/proxy/user/me.js
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000/api";

export const config = {
  api: {
    bodyParser: false, // لازم برای ارسال multipart / stream
  },
};

export default async function handler(req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "توکن یافت نشد" });
  }

  try {
    // پیش‌فرض مسیر به /auth/me
    let backendUrl = `${BACKEND_URL}/auth/me`;

    // اگر درخواست POST و از نوع multipart باشه => به endpoint آپلود آواتار بفرست
    const contentType = req.headers["content-type"] || "";
    if (req.method === "POST" && contentType.includes("multipart/form-data")) {
      backendUrl = `${BACKEND_URL}/auth/me/avatar`;

      // حتماً header content-type اصلی (با boundary) را فوروارد کن
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          Authorization: token,
          "content-type": contentType,
        },
        // ⚠️ مهم: برای ارسال stream به fetch باید duplex تنظیم شود
        duplex: "half",
        body: req,
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // حالت های معمولی GET / PUT (json)
    const options = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    if (req.method === "PUT" || req.method === "POST") {
      // برای POST معمولی (غیر-multipart) یا PUT
      // اگر body رو نریزیم و req.method POST باشه ممکنه نیاز باشه؛
      // اما توجه: bodyParser=false باعث میشه req.body در اینجا undefined باشه برای multipart
      // بنابراین این بخش برای JSON معمولی کار می‌کند (در request از فرانت JSON می‌فرستی).
      options.body = JSON.stringify(await parseJsonBodyIfPossible(req));
    }

    const response = await fetch(backendUrl, options);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (err) {
    console.error("Proxy /user/me error:", err);
    res.status(500).json({ error: "خطا در ارتباط با سرور" });
  }
}

// کمکی: در صورتی که body قابل خواندن به صورت JSON باشد، آن را بخوان.
// اگر نخواند (مثل زمانی که body یک stream است)، undefined برمی‌گرداند.
async function parseJsonBodyIfPossible(req) {
  try {
    // در حالت bodyParser: false، Next.js body را parse نمی‌کند.
    // برای JSON می‌توانیم خودمان بخوانیم (فقط برای درخواست‌های کوچک و JSON).
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const raw = Buffer.concat(chunks).toString("utf8");
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    // اگر خطا داشتیم، برمی‌گردانیم undefined تا caller تصمیم بگیرد
    return undefined;
  }
}
