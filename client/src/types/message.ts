import type { User } from './user';

export type Message = {
  sender: User,
  content: string
};
