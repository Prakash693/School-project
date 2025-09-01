import { connectDB } from "@/utils/db";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

function ensureUploadDir(uploadDir) {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public", "schoolImages");
  ensureUploadDir(uploadDir);

  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part, form) => {
      const unique = Date.now() + "_" + Math.round(Math.random() * 1e9);
      return `${unique}${ext}`;
    },
  });

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Form parse error" });
      }

      const getField = (k) => (Array.isArray(fields[k]) ? fields[k][0] : fields[k]);
      const name = getField("name");
      const address = getField("address");
      const city = getField("city");
      const state = getField("state");
      const contact = getField("contact");
      const email_id = getField("email_id");

      if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const fileObj = files.image;
      let storedFileName = null;
      if (fileObj) {
        const f = Array.isArray(fileObj) ? fileObj[0] : fileObj;
        const rel = path.basename(f.newFilename || f.originalFilename || f.filepath || f.path);
        storedFileName = rel;
      } else {
        return res.status(400).json({ error: "Image is required" });
      }

      const conn = await connectDB();
      await conn.execute(
        "CREATE TABLE IF NOT EXISTS schools (id INT AUTO_INCREMENT PRIMARY KEY, name TEXT NOT NULL, address TEXT NOT NULL, city TEXT NOT NULL, state TEXT NOT NULL, contact VARCHAR(15) NOT NULL, image TEXT NOT NULL, email_id VARCHAR(100) NOT NULL)"
      );

      await conn.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, storedFileName, email_id]
      );

      return res.status(200).json({ message: "School added successfully" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
}
