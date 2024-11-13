import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// configure the database connection
const connectDB = async () => {
  try {
    await pool.connect();
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};

export default connectDB;