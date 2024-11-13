import { Router } from "express";

import { register, login, userGet } from "../controllers/user.controller";

const userRouter = Router();

const auth = require("../auth");

// Register a new user
userRouter.post("/register", register);

// Login a user
userRouter.post("/login", login);

// get the logged in user
userRouter.get("/get", auth, userGet);

export const userRoutes = userRouter