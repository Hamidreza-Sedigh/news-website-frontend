import { BACKEND_BASE_URL } from '../config/backend';

export default async function handler(req, res) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/dashboard/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
}
