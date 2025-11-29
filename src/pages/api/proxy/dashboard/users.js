export default async function handler(req, res) {
  const BASE_URL = process.env.BACKEND_URL;

  try {
    const response = await fetch(`${BASE_URL}/dashboard/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error in /api/proxy/dashboard/users:", err);
    res.status(500).json({ error: "Server error" });
  }
}
