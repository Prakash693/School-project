import { connectDB } from "@/utils/db";

export default async function handler(req, res) {
  try {
    const conn = await connectDB();
    const [rows] = await conn.execute("SELECT id, name, address, city, image FROM schools ORDER BY id DESC");
    return res.status(200).json(rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
