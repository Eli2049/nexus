import React, { useState, useEffect } from 'react';
import { Search, UserPlus } from 'lucide-react';
import type { User, SearchResult } from '../../types';
import { searchUsers } from '../../services/userService';

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({ users: [], hasMore: false });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        try {
          const searchResult = await searchUsers(query);
          setResults(searchResult);
        } catch (error) {
          console.error('Ошибка поиска:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults({ users: [], hasMore: false });
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Поиск пользователей..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-4">Поиск...</div>
      ) : (
        <div className="space-y-4">
          {results.users.map((user) => (
            <UserSearchResult key={user.id} user={user} />
          ))}
          {query.length >= 2 && results.users.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              Пользователи не найдены
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function UserSearchResult({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar || import.meta.env.VITE_DEFAULT_AVATAR}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.status || 'Нет статуса'}</p>
        </div>
      </div>
      <button className="btn-secondary flex items-center gap-2">
        <UserPlus size={18} />
        <span>Добавить</span>
      </button>
    </div>
  );
}