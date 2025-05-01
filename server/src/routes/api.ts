import express from "express";

import { isAuthenticated } from "./auth/middleware";
import authRouter from "./auth/auth.router";
import boardsRouter from "./boards/boards.router";

const api = express.Router();

api.use("/auth", authRouter);
api.use("/:userId/boards", isAuthenticated, boardsRouter);

export default api;
