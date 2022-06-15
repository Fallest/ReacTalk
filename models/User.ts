import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

export const User = model("User", userSchema);
