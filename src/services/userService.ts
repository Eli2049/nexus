import type { SearchResult } from '../types';

// Имитация API-вызова для поиска пользователей
export async function searchUsers(query: string): Promise<SearchResult> {
  // В реальном приложении здесь был бы API-запрос
  await new Promise(resolve => setTimeout(resolve, 500)); // Имитация задержки сети

  return {
    users: [
      {
        id: '1',
        name: 'Анна Петрова',
        email: 'anna@example.com',
        status: 'Изучаю новое',
        isOnline: true,
        joinDate: '2024-01-01',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      },
      {
        id: '2',
        name: 'Иван Смирнов',
        email: 'ivan@example.com',
        status: 'На работе',
        isOnline: false,
        joinDate: '2024-02-01',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      },
    ].filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase())
    ),
    hasMore: false,
  };
}