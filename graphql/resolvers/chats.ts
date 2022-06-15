import { Chat } from "../../models/index";

module.exports = {
  Mutation: {
    async createChat(_, { createChatInput: { name, users } }) {
      const newChat = new Chat({
        name: name,
        users: users,
        messages: [],
        createdAt: new Date().toISOString(),
      });

      const res = await newChat.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async editChat(_, { id, editChatInput: { name, users } }) {
      const wasUpdated = (
        await Chat.updateOne({ _id: id }, { name: name, users: users })
      ).modifiedCount;
      return wasUpdated > 0;
    },
  },
  Query: {
    async chat(_, { ID }) {
      return await Chat.findById(ID);
    },
  },
};
