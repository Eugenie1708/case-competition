import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap, Users, Briefcase, BarChart3, Home } from 'lucide-react';
import { cn } from '../lib/utils';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/student", icon: GraduationCap, label: "Student" },
    { to: "/faculty", icon: Users, label: "Faculty" },
    { to: "/industry", icon: Briefcase, label: "Industry" },
    { to: "/leadership", icon: BarChart3, label: "Strategic Overview" },
  ];

  return (
    <aside className="w-20 hover:w-72 transition-all duration-300 ease-in-out bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50 overflow-hidden group shadow-lg">
      <div className="px-4 pt-4 pb-3 border-b border-gray-100 flex items-start">
        <div className="flex items-start gap-3 w-full min-w-0">
          <div className="w-8 h-8 min-w-[2rem] bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">G</div>
          <span className="min-w-0 max-w-full font-serif text-base font-semibold leading-tight text-gray-900 tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-normal break-words overflow-hidden">
            Gies Sustainability Dashboard
          </span>
        </div>
      </div>

      <nav className="flex-1 pt-3 pb-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative overflow-hidden",
              isActive 
                ? "bg-orange-50 text-orange-700" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className="w-5 h-5 min-w-[1.25rem] shrink-0" />
            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3 delay-75">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="max-h-0 opacity-0 transition-all duration-300 min-w-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100">
        <div className="m-4 mt-0 border-t border-gray-100 bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 font-medium uppercase mb-1">Data Source</p>
          <p className="text-xs text-gray-700 whitespace-normal break-words leading-snug">Publication Dataset v2.4</p>
          <div className="flex items-center gap-1 mt-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] text-gray-500 whitespace-normal break-words">Live & Connected</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
