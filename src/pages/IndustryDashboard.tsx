import React, { useMemo, useState } from 'react';
import { MOCK_PUBLICATIONS } from '../data/publications';
import { THEMES, getLeadershipMetrics, getSDGMetrics } from '../utils/transformData';
import { Lightbulb, TrendingUp, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { ResourceCard } from '../components/ResourceCard';
import { FilterDrawer } from '../components/FilterDrawer';
import { DashboardPageHeader } from '../components/DashboardPageHeader';
import { KPICard } from '../components/KPICard';
import { ConsultingDrawer } from '../components/ConsultingDrawer';

export const IndustryDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(THEMES[0]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isConsultingOpen, setIsConsultingOpen] = useState(false);
  const leadershipMetrics = useMemo(() => getLeadershipMetrics(), []);
  const sdgMetrics = useMemo(() => getSDGMetrics(), []);

  const sdgBusinessTooltipTopicsBySdg: Partial<Record<number, string[]>> = {
    3: ['Preventive health analytics', 'Healthcare operations', 'Digital diagnostics'],
    7: ['Energy transition', 'Operational efficiency', 'Renewable procurement'],
    9: ['Process automation', 'Resilient infrastructure', 'Industrial innovation'],
    12: ['Circular supply chains', 'Waste reduction', 'Sustainable sourcing'],
    13: ['Carbon accounting', 'Scope 3 reporting', 'Energy transition'],
    16: ['Governance controls', 'Compliance transparency', 'Risk oversight'],
    17: ['Cross-sector partnerships', 'Joint ventures', 'Innovation ecosystems'],
  };

  // Filter publications for the active theme to derive insights
  const themePubs = MOCK_PUBLICATIONS.filter(p => 
    p.top_1 === activeTab || p.top_2 === activeTab
  ).slice(0, 3);

  return (
    <div className="space-y-8">
      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <ConsultingDrawer isOpen={isConsultingOpen} onClose={() => setIsConsultingOpen(false)} />
      <DashboardPageHeader
        title="Industry Insights"
        subtitle="Translating academic research into actionable business intelligence."
        sdgBasePath="/industry/sdg"
        sdgBusinessTooltipTopicsBySdg={sdgBusinessTooltipTopicsBySdg}
        filterButton={
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 shrink-0"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard 
          title="Research Insights Available" 
          value={leadershipMetrics.totalPublications} 
          trend="+7%" 
          trendDirection="up" 
        />
        <KPICard 
          title="Active Business Frameworks" 
          value={THEMES.length} 
          trend="Active" 
          trendDirection="neutral" 
        />
        <KPICard 
          title="Top Business Opportunity" 
          value={sdgMetrics[0]?.shortName || "N/A"} 
          trend="High Priority" 
          trendDirection="up" 
        />
      </div>

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
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Estimated Impact</h4>
                <p className="text-sm text-gray-600">15% efficiency improvement</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Implementation Difficulty</h4>
                <p className="text-sm text-gray-600">Medium</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
                <h4 className="font-medium text-gray-900 mb-2">Best Fit Industries</h4>
                <p className="text-sm text-gray-600">Manufacturing • Logistics • Retail</p>
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
              Connect with Gies faculty and student teams working on {activeTab}.
            </p>
            <button
              onClick={() => setIsConsultingOpen(true)}
              className="w-full py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Explore Experts
              <span className="ml-1 text-gray-500">• Request Consulting</span>
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
                <div>
                  <div className="text-sm text-gray-600">Rising demand for Scope 3 emissions reporting.</div>
                  <div className="text-xs text-gray-400">Source: EU CSRD Regulation</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <div className="text-sm text-gray-600">Global supply chain compliance mandates are accelerating disclosure timelines.</div>
                  <div className="text-xs text-gray-400">Source: World Economic Forum Supply Chain Outlook</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <div className="text-sm text-gray-600">Investor scrutiny is increasing around governance readiness and transition plans.</div>
                  <div className="text-xs text-gray-400">Source: MSCI ESG Trends Report</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">💛 Support Our Mission</h3>
            <p className="text-sm text-gray-500 mb-4">Help expand sustainability research translation into industry impact.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['$10', '$25', '$50', '$100'].map((amount) => (
                <span key={amount} className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-full">
                  {amount}
                </span>
              ))}
            </div>
            <a
              href="https://giesbusiness.illinois.edu/give"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full justify-center py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
            >
              Donate Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

