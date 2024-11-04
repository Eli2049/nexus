import React from 'react';
import { MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import type { User } from '../../types';

interface ProfileCardProps {
  user: User;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export default function ProfileCard({ user, stats }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-purple-500 to-blue-500" />
      
      <div className="px-6 py-4">
        <div className="flex items-start">
          <img
            src={user.avatar || 'https://via.placeholder.com/100'}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-white -mt-12"
          />
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
          </div>
        </div>

        <p className="mt-4 text-gray-700">{user.status || 'No status set'}</p>

        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin size={16} />
            Location
          </span>
          <span className="flex items-center gap-1">
            <LinkIcon size={16} />
            Website
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            Joined 2024
          </span>
        </div>

        <div className="flex gap-8 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.posts}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.followers}</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.following}</div>
            <div className="text-sm text-gray-600">Following</div>
          </div>
        </div>
      </div>
    </div>
  );
}