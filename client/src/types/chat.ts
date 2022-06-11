import type { User } from './user';
import type { Message } from './message';

export type Chat = {
  name: string,
  users: User[],
  messages: Message[]
};
