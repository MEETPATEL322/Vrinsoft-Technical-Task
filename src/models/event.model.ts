import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { IEvent } from "../interfaces/event.interface";
import { User } from "./user.model";

export class Event extends Model<IEvent> implements IEvent {
  public _id!: string;
  public title!: string;
  public payload!: object;
  public userId!: string;
  public status!: "pending" | "processed" | "failed";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Event.init(
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    payload: { type: DataTypes.JSON, allowNull: false },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "processed", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "events",
    timestamps: true,
    underscored: false,
  }
);

Event.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});

User.hasMany(Event, {
  foreignKey: "userId",
  as: "events",
});
