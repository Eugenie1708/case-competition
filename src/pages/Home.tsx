import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, Briefcase, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { SDGS } from '../utils/transformData';

export const Home: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Intro Section */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl font-serif font-medium text-gray-900 mb-4">
            Welcome to the Gies Sustainability Dashboard
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Explore our sustainability impact through a publication-centered lens. 
            This platform aggregates data from faculty research, mapped directly to the 
            <strong> UN Sustainable Development Goals (SDGs)</strong>.
          </p>
          
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-2">
            {SDGS.map((sdg) => (
              <Link 
                key={sdg.id} 
                to={`/sdg/${sdg.id}`}
                className="group relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all"
                title={sdg.name}
              >
                <img 
                  src={sdg.image} 
                  alt={sdg.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none" />
      </div>

      {/* Main Entry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/student" className="group">
          <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full hover:border-orange-200 transition-colors">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-100 transition-colors">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Student Dashboard</h3>
            <p className="text-gray-500 text-sm mb-4">
              Discover research opportunities, explore trending sustainability themes, and find faculty mentors.
            </p>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              Explore Data <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </motion.div>
        </Link>

        <Link to="/faculty" className="group">
          <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full hover:border-orange-200 transition-colors">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-100 transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Faculty Dashboard</h3>
            <p className="text-gray-500 text-sm mb-4">
              Analyze research impact, track departmental contributions, and identify collaboration opportunities.
            </p>
            <div className="flex items-center text-purple-600 text-sm font-medium">
              View Profiles <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </motion.div>
        </Link>

        <Link to="/industry" className="group">
          <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full hover:border-orange-200 transition-colors">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-100 transition-colors">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Industry Dashboard</h3>
            <p className="text-gray-500 text-sm mb-4">
              Translate academic research into actionable business insights and strategic frameworks.
            </p>
            <div className="flex items-center text-emerald-600 text-sm font-medium">
              See Insights <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/leadership" className="md:col-span-1 group">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-sm h-full text-white hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-medium mb-2">Leadership Metrics</h3>
            <p className="text-gray-400 text-sm">
              High-level executive summary of Gies sustainability performance and strategic goals.
            </p>
          </div>
        </Link>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Trending Insight</h3>
          <div className="flex gap-6">
            <div className="flex-1">
              <h4 className="text-lg font-serif font-medium text-gray-900 mb-2">
                Supply Chain Resilience in Emerging Markets
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Recent publications indicate a shift towards localized sourcing strategies to mitigate global disruptions.
                Faculty in Business Administration are leading this conversation.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">Supply Chain</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">Emerging Markets</span>
              </div>
            </div>
            <div className="w-px bg-gray-100" />
            <div className="w-1/3 flex flex-col justify-center">
               <div className="text-center">
                 <span className="block text-3xl font-semibold text-orange-600">12%</span>
                 <span className="text-xs text-gray-500">Increase in Supply Chain pubs</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
