import { model, Schema } from "mongoose";

const chatSchema = new Schema({
  name: { type: String, unique: true },
  users: [String],
  createdAt: String,
});

export const Chat = model("Chat", chatSchema);
