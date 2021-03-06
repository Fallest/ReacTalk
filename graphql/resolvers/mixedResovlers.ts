import { Chat, Message, User } from "../../models/index";

module.exports = {
  Mutation: {
    async deleteUser(_, { id }) {
      /**
       * Deletes the user and all data related to that user.
       * For that, we need to remove:
       *  -All the messages the user has sent.
       *  -The user from the chats lists.
       *  -The user from the database.
       */
      await Message.deleteMany({ sender: id }); // Delete all messages.

      (await Chat.find({ users: id })).forEach(async (chat: any) => {
        let updatedUsers = [];
        (await Chat.find({ _id: chat._id }).populate("users")).forEach(
          (chat: { users: String[] }) =>
            (updatedUsers = [...updatedUsers.concat(chat.users)])
        );
        let updatedUsersSet = new Set(updatedUsers); // Get an updated lists of users.
        updatedUsersSet.delete(id);
        updatedUsers = [...updatedUsersSet];

        await Chat.updateOne({ _id: chat._id }, { users: updatedUsers });
      });

      const wasDeleted = (await User.deleteOne({ _id: id }, { _id: id }))
        .deletedCount;
      return wasDeleted > 0;
    },
    async deleteChat(_, { id }) {
      /** Deletes a chat given the ID
       * Must delete all messages sent to that chat beforehand.
       */
      await Message.deleteMany({ toChat: id }); // Delete all messages related to that chat
      return (await Chat.deleteOne({ _id: id })).deletedCount > 0;
    },
    async addUserToChat(_, { userName, chatName }) {
      /**
       * Add a user to a Chat's user list.
       */
      let usrs = await Chat.findOne({ name: chatName }).populate("users");
      usrs.users.push(userName);
      const wasUpdated = (
        await Chat.updateOne({ name: chatName }, { users: usrs.users })
      ).modifiedCount;
      return wasUpdated > 0;
    },
  },

  Query: {
    async getUsers(_, { userName }) {
      /**
       * Returns the IDs of all the users that share a chat with a user.
       *
       * For that we need all the chats the user is part of,
       * and then we return a joint array of all the users that
       * are part of those chats.
       */
      let res = [];
      // Get all the {Chat: users[]} documents (an array of Chats
      // where they only have the "users" value (another array))
      (
        await Chat.find({ users: userName }) // Get all the chats the user is part of.
          .populate("users")
      ) // Get only the user lists.
        .forEach(
          // Now we have an array of arrays, so we got to concatenate all the internal arrays into one.
          (chat: { users: String[] }) => (res = [...res.concat(chat.users)])
        );

      // Since a user could be repeated in various chats, by using a set, repeated users are removed.
      return [...new Set(res)];
    },
    async getChats(_, { userName }) {
      /**
       * Returns all chats the user is part of.
       * For each chat, check if the user is in the user list.
       */
      return await Chat.find({ users: userName });
    },
    async getMessages(_, { chatName }) {
      /**
       * Return all the messages of a chat.
       */
      return await Message.find({ toChat: chatName });
    },
  },
};
