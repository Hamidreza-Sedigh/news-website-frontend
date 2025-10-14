//api/proxy/rate.js
import { withAuth } from "./middlewares/withAuth";
import { BACKEND_BASE_URL } from "./config/backend";

async function handler(req, res) {
  try {
    const base = req.query.base || "USD";
    const target = req.query.target || "IRR";

    const response = await fetch(`${BACKEND_BASE_URL}/api/rate?base=${base}&target=${target}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching rate:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export default withAuth(handler);
