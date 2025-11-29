//api/proxy/rate.js
import { withAuth } from "./middlewares/withAuth";

async function handler(req, res) {
  try {
    const BASE_URL = process.env.BACKEND_URL;
    const base = req.query.base || "USD";
    const target = req.query.target || "IRR";

    const response = await fetch(`${BASE_URL}/rate?base=${base}&target=${target}`, {
      headers: {
        Authorization: `Bearer ${process.env.BACKEND_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error("❌ Error fetching rate:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export default withAuth(handler);
