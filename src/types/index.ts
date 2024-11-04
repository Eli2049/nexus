export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
  isOnline: boolean;
  location?: string;
  website?: string;
  joinDate: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  timestamp: number;
  likes: number;
  comments: number;
}

export interface SearchResult {
  users: User[];
  hasMore: boolean;
}