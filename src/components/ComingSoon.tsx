import React from 'react';
import { Timer, ThumbsUp } from 'lucide-react';
import type { ComingSoonFeature } from '../types';

export default function ComingSoon({ feature }: { feature: ComingSoonFeature }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-purple-900">{feature.title}</h3>
        <Timer className="text-purple-600" />
      </div>
      <p className="text-gray-600 mb-4">{feature.description}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-purple-600 font-medium">
          Expected: {feature.estimatedRelease}
        </span>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors duration-200">
          <ThumbsUp size={16} />
          <span>{feature.votes} votes</span>
        </button>
      </div>
    </div>
  );
}