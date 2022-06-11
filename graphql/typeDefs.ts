import { gql } from "apollo-server";

module.exports = gql`
  type User {
    username: String
    email: String
    password: String
    token: String
    friends: User[]
    chats: Chat[]
  }       

  type Chat {
    name: String
    users: User[]
    messages: Message[]
  }

  type Message {
    sender: User
    content: String
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

  input AddFriendInput {
    friendData: String
  }

  input CreateChatInput {
    name: String
    users: Chat[]
  }

  input SendMessageInput {
    toChat: String
    sender: User
    content: String
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    addFriend(addFriendInput: AddFriendInput): User
    createChat(createChatInput: CreateChatInput): Chat
    sendMessage(sendMessageInput: SendMessageInput): Message
  }

  type Query {
    user(id: ID!): User
    chat(id: ID!): Chat
    message(id: ID!): Message
  }
`;
