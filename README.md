# School Project (Next.js + MySQL)

Two pages as per assignment:
- **/addSchool**: Add a school using a responsive form (react-hook-form). Image is uploaded to `public/schoolImages`.
- **/showSchools**: Display schools like product cards (name, address, city, image).

## Tech
- Next.js (Pages Router)
- React Hook Form
- MySQL (mysql2)
- Formidable for file uploads
- Tailwind CSS

## Database
Create the database and table (optional — API will create the table if not found):
```sql
CREATE DATABASE schooldb;
USE schooldb;
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(15) NOT NULL,
  image TEXT NOT NULL,
  email_id VARCHAR(100) NOT NULL
);
```

## Env Placeholders
Create a `.env.local` in project root:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=schooldb
```

## Run Locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Notes for Deployment
- Local file uploads to `public/schoolImages` will **not** work on serverless hosts like Vercel (read-only FS). For hosting, use an external storage (e.g., S3, Cloudinary) and save the URL in DB.
- For the assignment demo, running locally is sufficient.

## Folder Structure
```
pages/
  api/
    addSchool.js
    getSchools.js
  addSchool.jsx
  showSchools.jsx
public/
  schoolImages/
utils/
  db.js
styles/
  globals.css
```

## Validation
- Email format, contact digits 7–15, required fields enforced on the client.
```

