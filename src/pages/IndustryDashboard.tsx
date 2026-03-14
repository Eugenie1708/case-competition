import React, { useState } from 'react';
import { MOCK_PUBLICATIONS } from '../data/publications';
import { THEMES } from '../utils/transformData';
import { Lightbulb, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { ResourceCard } from '../components/ResourceCard';
import { DashboardPageHeader } from '../components/DashboardPageHeader';

export const IndustryDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(THEMES[0]);

  // Filter publications for the active theme to derive insights
  const themePubs = MOCK_PUBLICATIONS.filter(p => 
    p.top_1 === activeTab || p.top_2 === activeTab
  ).slice(0, 3);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="Industry Insights"
        subtitle="Translating academic research into actionable business intelligence."
        sdgBasePath="/industry/sdg"
      />

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-gray-200">
        {THEMES.map((theme) => (
          <button
            key={theme}
            onClick={() => setActiveTab(theme)}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg border-b-2 transition-colors",
              activeTab === theme
                ? "border-orange-500 text-orange-700 bg-orange-50/50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            {theme}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Insight Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-orange-600 font-medium text-sm uppercase tracking-wide mb-4">
              <Lightbulb className="w-4 h-4" />
              Strategic Framework
            </div>
            <h3 className="text-2xl font-serif font-medium text-gray-900 mb-4">
              Implementing {activeTab} Strategies in 2025
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Based on recent studies from Gies faculty, businesses can leverage new frameworks in {activeTab.toLowerCase()} to drive competitive advantage. 
              Key findings suggest a 15% efficiency gain when integrating these practices early in the product lifecycle.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Key Driver</h4>
                <p className="text-sm text-gray-600">Regulatory pressure and consumer demand are converging to accelerate adoption.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Risk Factor</h4>
                <p className="text-sm text-gray-600">Failure to adapt supply chain transparency may lead to reputational damage.</p>
              </div>
            </div>
          </div>

          <h3 className="font-medium text-gray-900">Related Research Briefs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {themePubs.map((pub) => (
              <ResourceCard key={pub.article_uuid} publication={pub} type="Brief" />
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
            <h3 className="font-serif text-lg mb-4">Expert Connect</h3>
            <p className="text-gray-300 text-sm mb-6">
              Looking for deep expertise in {activeTab}? Connect with our top researchers for advisory and collaboration.
            </p>
            <button className="w-full py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Find Experts
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Market Signals
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="text-sm text-gray-600">Rising demand for scope 3 emissions reporting standards.</span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="text-sm text-gray-600">New EU regulations impacting global supply chain compliance.</span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="text-sm text-gray-600">Increased investor scrutiny on governance structures.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

