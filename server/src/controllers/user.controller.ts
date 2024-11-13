import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import { Pool } from "pg";
const jwt = require("jsonwebtoken");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// register a new user
export const register = async (req: Request, res: Response):Promise<any>=> {
  try {
    // get the user data from the request body
    const { email, password } = req.body;

    // check if user data is provided
    if (!email || !password) {
      return res.status(200).json({
        message: "Please provide email and password",
      });
    }

    // check if user already exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(200).json({
        message: "User with this email already exists",
      });
    }

    // hash the password
    const extraSalt = process.env.GLOBAL_SALT
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(extraSalt+password, salt);

    // execute SQL query to insert user into the database
    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
    `;
    await pool.query(query, [email, hashedPassword]);

    const query2 = `SELECT * FROM users WHERE email=$1`;
    const savedUser = await pool.query(query2, [email]);

    const token = jwt.sign(
          {
            id: savedUser.rows[0].id,
            email: savedUser.rows[0].email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

    return res.status(200).json({
      message: "User registered successfully",
      user: {
        id: savedUser.rows[0].id,
        email: savedUser.rows[0].email,
      },
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// login a user
export const login = async (req: Request, res: Response):Promise<any>=> {
  try {
    // get the user data from the request body
    const { email, password } = req.body;

    // check if user data is provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all user details",
      });
    }

    // check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    // compare the password against the salted challenge password
    const extraSalt = process.env.GLOBAL_SALT;
    const validPassword = await bcrypt.compare(extraSalt+password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // If the email and password are valid, create the jwt
    const token = jwt.sign(
          {
            id: user.rows[0].id,
            email: user.rows[0].email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

    // return user data
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
      },
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const userGet = async (req: Request, res: Response):Promise<any>=> {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = String(req?.headers?.authorization?.replace('Bearer ', ''));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const nextUser = await pool.query("SELECT id, email FROM users WHERE id = $1", [
      decoded.id,
    ]);
    if (!nextUser) {
      res.status(400).json(defaultReturnObject);
      return;
    }
    res.status(200).json({ authenticated: true, user: nextUser.rows[0] });
  }
  catch (err) {
    console.error('GET user/get, Something Went Wrong', err);
    res.status(400).json(defaultReturnObject);
  }
};