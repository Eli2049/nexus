import type { Chat, Message } from '../types';

// Имитация API-вызовов для чата
export async function getChats(): Promise<Chat[]> {
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      id: '1',
      participants: ['currentUserId', '2'],
      lastMessage: {
        id: '1',
        senderId: '2',
        receiverId: 'currentUserId',
        content: 'Привет! Как дела?',
        timestamp: Date.now() - 3600000,
        isRead: false,
      },
      unreadCount: 1,
    },
    {
      id: '2',
      participants: ['currentUserId', '3'],
      lastMessage: {
        id: '2',
        senderId: 'currentUserId',
        receiverId: '3',
        content: 'Договорились!',
        timestamp: Date.now() - 86400000,
        isRead: true,
      },
      unreadCount: 0,
    },
  ];
}

export async function sendMessage(chatId: string, content: string): Promise<Message> {
  await new Promise(resolve => setTimeout(resolve, 200));

  return {
    id: Date.now().toString(),
    senderId: 'currentUserId',
    receiverId: chatId,
    content,
    timestamp: Date.now(),
    isRead: false,
  };
}

export async function markAsRead(messageId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 100));
}