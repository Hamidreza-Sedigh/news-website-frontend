export default async function handler(req, res) {
    try {
      const token = req.headers.authorization;
      const backendUrl = `${process.env.BACKEND_URL || "http://localhost:8000"}/api/dashboard/weekly-reads`;
  
      const response = await fetch(backendUrl, {
        headers: {
          Authorization: token,
        },
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (err) {
      console.error("خطا در proxy weekly-reads:", err);
      res.status(500).json({ message: "خطا در اتصال به سرور" });
    }
  }
  