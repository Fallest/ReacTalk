import { model, Schema } from "mongoose";

const chatSchema = new Schema({
  name: String,
  users: [String],
  createdAt: String,
});

export const Chat = model("Chat", chatSchema);
