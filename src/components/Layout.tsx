import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatbotPanel } from './ChatbotPanel';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F2] font-sans text-gray-900 flex">
      <Sidebar />
      <div className="flex-1 ml-20 flex flex-col min-h-screen transition-all duration-300">
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <Outlet />
        </main>
      </div>
      <ChatbotPanel />
    </div>
  );
};
