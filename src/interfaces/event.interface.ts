export interface IEvent {
  _id?: string;
  title: string;
  payload: object;
  userId: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
