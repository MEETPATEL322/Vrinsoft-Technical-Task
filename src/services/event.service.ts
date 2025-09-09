import { IEvent } from "../interfaces/event.interface";
import { Event } from "../models/event.model";
import { User } from "../models/user.model";

export class EventServices {
  public static async createEvent(eventData: IEvent): Promise<IEvent> {
    const newUser = await Event.create(eventData);
    return newUser.toJSON() as IEvent;
  }
}
