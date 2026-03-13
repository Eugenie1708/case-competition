import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatbotPanel } from './ChatbotPanel';
import { Outlet } from 'react-router-dom';
import { Search, User } from 'lucide-react';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F2] font-sans text-gray-900 flex">
      <Sidebar />
      <div className="flex-1 ml-20 flex flex-col min-h-screen transition-all duration-300">
        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-6">
            <div className="mb-6 flex justify-end">
              <div className="flex w-full max-w-md items-center justify-end gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search publications, faculty..."
                    className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm">
                  <User className="h-4 w-4" />
                </div>
              </div>
            </div>

            <Outlet />
          </div>
        </main>
      </div>
      <ChatbotPanel />
    </div>
  );
};
