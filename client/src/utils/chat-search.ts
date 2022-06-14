export const chatSearch = (chatName: string, searchFor: string): boolean => {
  return chatName.toLowerCase().includes(searchFor.toLowerCase());
};
