import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video } from 'lucide-react';
import type { Message, Chat, User } from '../../types';
import { getChats, sendMessage, markAsRead } from '../../services/chatService';

interface ChatWindowProps {
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
}

export default function ChatWindow({ activeChat, onChatSelect }: ChatWindowProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadChats = async () => {
      const userChats = await getChats();
      setChats(userChats);
    };
    loadChats();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeChat) {
      // Load messages for active chat
      scrollToBottom();
    }
  }, [activeChat, messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChat || !newMessage.trim()) return;

    try {
      const message = await sendMessage(activeChat, newMessage);
      setMessages([...messages, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-12rem)]">
      <div className="flex h-full">
        {/* Список чатов */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Сообщения</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {chats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChat}
                onClick={() => onChatSelect(chat.id)}
              />
            ))}
          </div>
        </div>

        {/* Окно чата */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              <ChatHeader />
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Введите сообщение..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!newMessage.trim()}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Выберите чат для начала общения
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatHeader() {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="https://via.placeholder.com/40"
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-medium">Имя пользователя</h3>
          <span className="text-sm text-green-500">В сети</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="btn-secondary p-2">
          <Phone size={20} />
        </button>
        <button className="btn-secondary p-2">
          <Video size={20} />
        </button>
      </div>
    </div>
  );
}

function ChatListItem({ chat, isActive, onClick }: { chat: Chat; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 ${
        isActive ? 'bg-purple-50' : ''
      }`}
    >
      <img
        src="https://via.placeholder.com/40"
        alt=""
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1 text-left">
        <h4 className="font-medium">Имя пользователя</h4>
        <p className="text-sm text-gray-500 truncate">
          {chat.lastMessage?.content || 'Нет сообщений'}
        </p>
      </div>
      {chat.unreadCount > 0 && (
        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
          {chat.unreadCount}
        </span>
      )}
    </button>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isMine = message.senderId === 'currentUserId'; // Replace with actual user ID check

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg ${
          isMine
            ? 'bg-purple-500 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        }`}
      >
        <p>{message.content}</p>
        <span className={`text-xs ${isMine ? 'text-purple-200' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}