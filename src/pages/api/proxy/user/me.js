//api/proxy/user/me.js
const BASE_URL = process.env.BACKEND_URL;

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
    let backendUrl = `${BASE_URL}/auth/me`;

    const contentType = req.headers["content-type"] || "";
    if (req.method === "POST" && contentType.includes("multipart/form-data")) {
      backendUrl = `${BASE_URL}/auth/me/avatar`;

      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          Authorization: token,
          "content-type": contentType,
        },
        duplex: "half",
        body: req,
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // حالت JSON معمولی برای GET/PUT/POST
    const options = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    if (req.method === "PUT" || req.method === "POST") {
      options.body = JSON.stringify(await parseJsonBodyIfPossible(req));
    }

    const response = await fetch(backendUrl, options);
    const data = await response.json();
    res.status(response.status).json(data);

  } catch (err) {
    console.error("❌ Proxy /user/me error:", err);
    res.status(500).json({ error: "خطا در ارتباط با سرور" });
  }
};

async function parseJsonBodyIfPossible(req) {
  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const raw = Buffer.concat(chunks).toString("utf8");
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return undefined;
  }
}
