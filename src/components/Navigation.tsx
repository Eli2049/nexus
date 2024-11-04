import React from 'react';
import { Home, MessageCircle, Users, Bell, Settings, Menu } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t md:left-0 md:top-0 md:w-20 md:h-full md:border-r">
      <div className="flex justify-around md:flex-col md:h-full md:justify-start md:pt-8">
        <NavItem icon={<Home size={24} />} label="Home" />
        <NavItem icon={<MessageCircle size={24} />} label="Messages" />
        <NavItem icon={<Users size={24} />} label="Friends" />
        <NavItem icon={<Bell size={24} />} label="Notifications" />
        <NavItem icon={<Settings size={24} />} label="Settings" />
      </div>
    </nav>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="p-4 hover:bg-gray-100 rounded-lg transition-colors duration-200 group relative">
      <div className="flex flex-col items-center">
        {icon}
        <span className="text-xs mt-1 md:hidden">{label}</span>
      </div>
      <div className="hidden md:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {label}
      </div>
    </button>
  );
}