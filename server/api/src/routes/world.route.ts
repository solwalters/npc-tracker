import { Router } from "express";
import { getUserWorlds, createWorld, deleteWorld } from "../controllers/world.controller";

const worldRouter = Router();
const auth = require("../auth");

// Register a new user
worldRouter.get("/getWorldsForUser/:userId", auth, getUserWorlds);

worldRouter.post("/create/", auth, createWorld);

worldRouter.post("/delete/:worldId", auth, deleteWorld);

export const worldRoutes = worldRouter