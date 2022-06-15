import type { Chat } from './chat';


export type User = {
  username: string,
  email: string,
  friends: User[],
  chats: Chat[]
};
