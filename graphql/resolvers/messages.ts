import { Message } from "../../models";

module.exports = {
  Mutation: {
    async sendMessage(_, { sendMessageInput: { toChat, sender, content } }) {
      const newMessage = new Message({
        toChat: toChat,
        sender: sender,
        content: content,
        createdAt: new Date().toISOString(),
      });

      const res = await newMessage.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
  Query: {
    async message(_, { ID }) {
      return await Message.findById(ID);
    },
  },
};
