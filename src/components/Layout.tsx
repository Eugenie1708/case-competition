import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ChatbotPanel } from './ChatbotPanel';
import { Outlet, useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/': return 'Overview';
      case '/student': return 'Student Dashboard';
      case '/faculty': return 'Faculty Dashboard';
      case '/industry': return 'Industry Dashboard';
      case '/leadership': return 'Leadership Dashboard';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F2] font-sans text-gray-900 flex">
      <Sidebar />
      <div className="flex-1 ml-20 flex flex-col min-h-screen transition-all duration-300">
        <Topbar title={getPageTitle()} />
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <ChatbotPanel />
    </div>
  );
};
