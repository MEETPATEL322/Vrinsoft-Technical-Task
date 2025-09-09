import express from "express";
import { EventController } from "../controllers/event.controller";
import { authUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/trigger", authUser, EventController.createEvent);

export default router;
