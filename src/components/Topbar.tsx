import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export const Topbar: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-30">
      <h1 className="text-xl font-serif font-medium text-gray-900">{title || "Dashboard"}</h1>
      
      <div className="flex items-center gap-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search publications, faculty..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>
        
        <button className="relative text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 border border-gray-200">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
};
