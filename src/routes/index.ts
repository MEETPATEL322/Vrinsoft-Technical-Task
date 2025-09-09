import express, { Request, Response, NextFunction } from "express";
import UserRoutes from "../routes/user.routes";

const router = express.Router();

router.use("/auth", UserRoutes);

export default router;
