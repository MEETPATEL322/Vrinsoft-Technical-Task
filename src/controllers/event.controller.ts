import { Request, Response } from "express";
import { EventServices } from "../services/event.service";
import { CustomRequest } from "../interfaces/user.interface";
import { validateEvent } from "../validators/event.validator";
import { publishRedis } from "../helpers/redis/publish-redis";

export class EventController {
  public static async createEvent(req: CustomRequest, res: Response) {
    try {
      const validatedData = await validateEvent(req.body);
      const userId = validatedData.userId ?? req?.user?.id;

      console.log(validatedData, "validatedData");
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required but was not provided.",
        });
      }

      const event = await EventServices.createEvent({
        title: validatedData.title,
        payload: validatedData.payload,
        userId,
        status: "pending",
      });

      const msg = {
        eventId: event._id,
        title: event.title,
        payload: event.payload,
        userId: event.userId,
        createdAt: event.createdAt,
      };

      console.log(msg, "msg");

      await publishRedis(msg);

      res.status(202).json({ status: "accepted", eventId: event._id });
      return;
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || "Failed to Create Event.",
      });
      return;
    }
  }
}
