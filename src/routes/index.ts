import express, { Request, Response, NextFunction } from "express";
import UserRoutes from "../routes/user.routes";
import EventRoutes from "../routes/event.routes";


const router = express.Router();

router.use("/auth", UserRoutes);
router.use("/events", EventRoutes);

export default router;
