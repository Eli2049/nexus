import React, { useState } from 'react';
import { MessageCircle, Users, Bell } from 'lucide-react';
import Navigation from './components/Navigation';
import AuthForm from './components/auth/AuthForm';
import ProfileCard from './components/profile/ProfileCard';
import ChatWindow from './components/chat/ChatWindow';
import UserSearch from './components/search/UserSearch';
import { MOCK_USER } from './data/mockData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="md:ml-20 px-4 py-6 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Нексус</h1>
          <p className="text-gray-600">Общайся. Делись. Открывай.</p>
        </header>

        {!isAuthenticated ? (
          <AuthForm onSuccess={() => setIsAuthenticated(true)} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <ProfileCard
                user={MOCK_USER}
                stats={{ posts: 142, followers: 1234, following: 567 }}
              />
            </div>
            
            <div className="lg:col-span-6">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <UserSearch />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatsCard
                  icon={<MessageCircle className="text-blue-500" />}
                  title="Сообщения"
                  value="2.5M+"
                />
                <StatsCard
                  icon={<Users className="text-green-500" />}
                  title="Пользователи"
                  value="500K+"
                />
                <StatsCard
                  icon={<Bell className="text-purple-500" />}
                  title="Уведомления"
                  value="1.2K"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <ChatWindow
                activeChat={activeChat}
                onChatSelect={setActiveChat}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatsCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-2xl font-bold text-purple-600">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default App;