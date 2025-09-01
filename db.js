import mysql from "mysql2/promise";

let cached = global._dbConn;
if (!cached) cached = global._dbConn = { conn: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  const host = process.env.DB_HOST || "localhost";
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASS || "";
  const database = process.env.DB_NAME || "schooldb";

  const connection = await mysql.createConnection({ host, user, password, database });
  cached.conn = connection;
  return connection;
}
