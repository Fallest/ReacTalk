const usersResolvers = require("./users");
const messagesResolvers = require("./messages");
const chatsResolvers = require("./chats");
const mixedResolvers = require("./mixedResovlers");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...messagesResolvers.Query,
    ...chatsResolvers.Query,
    ...mixedResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...messagesResolvers.Mutation,
    ...chatsResolvers.Mutation,
    ...mixedResolvers.Mutation,
  },
};
