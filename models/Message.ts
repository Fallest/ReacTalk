import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  toChat: String,
  sender: String,
  content: String,
  createdAt: String,
});

export const Message = model("Message", messageSchema);
