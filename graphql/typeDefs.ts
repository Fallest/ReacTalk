import { gql } from "apollo-server";

module.exports = gql`
  type User {
    username: String
    email: String
    password: String
    token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
  }

  input LoginInput {
    username: String
    password: String
  }

  input EditUsernameInput {
    username: String
  }

  input EditEmailInput {
    email: String
  }

  input EditPasswordInput {
    password: String
  }

  type Chat {
    name: String
    users: [String]
    createdAt: String
  }

  input CreateChatInput {
    name: String
    users: [String]
  }

  input EditChatInput {
    name: String
    users: [String]
  }

  type Message {
    toChat: String
    sender: String
    content: String
    createdAt: String
  }

  input SendMessageInput {
    toChat: String
    sender: String
    content: String
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    changeUsername(id: ID!, editUsernameInput: EditUsernameInput): Boolean
    changeEmail(id: ID!, editEmailInput: EditEmailInput): Boolean
    changePassword(id: ID!, editPasswordInput: EditPasswordInput): Boolean
    deleteUser(id: ID!): Boolean

    createChat(createChatInput: CreateChatInput): Chat!
    editChat(id: ID!, editChatInput: EditChatInput): Boolean
    addUserToChat(userName: String, chatName: String): Boolean
    deleteChat(id: ID!): Boolean

    sendMessage(sendMessageInput: SendMessageInput): Message!
  }

  type Query {
    user(id: ID!): User
    getUsers(userName: String): [String]
    chat(id: ID!): Chat
    getChats(userName: String): [Chat]
    message(id: ID!): Message
    getMessages(chatName: String): [Message]
  }
`;
