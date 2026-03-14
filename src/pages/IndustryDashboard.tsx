import React, { useMemo, useState } from 'react';
import { MOCK_PUBLICATIONS } from '../data/publications';
import { THEMES, getFacultyData, getLeadershipMetrics, getSDGMetrics } from '../utils/transformData';
import { Lightbulb, TrendingUp, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { ResourceCard } from '../components/ResourceCard';
import { FilterDrawer } from '../components/FilterDrawer';
import { DashboardPageHeader } from '../components/DashboardPageHeader';
import { KPICard } from '../components/KPICard';
import { ConsultingDrawer } from '../components/ConsultingDrawer';
import { Link } from 'react-router-dom';

const INDUSTRY_THEME_CONTENT: Record<string, {
  takeaways: string[];
  roadmap: string[];
  bestFitIndustries: string[];
  businessRelevance: string;
  leaders: Array<{ company: string; initiative: string }>;
}> = {
  'Climate & Carbon': {
    takeaways: [
      'Early Scope 3 transparency provides regulatory advantage.',
      'Carbon disclosure readiness improves investor confidence.',
      'Lifecycle carbon accounting reduces long-term compliance cost.',
    ],
    roadmap: [
      'Map supply chain emissions sources.',
      'Build supplier carbon disclosure infrastructure.',
      'Integrate carbon metrics into procurement systems.',
      'Implement ESG reporting and governance processes.',
    ],
    bestFitIndustries: ['Manufacturing', 'Logistics', 'Retail'],
    businessRelevance: 'Climate risk disclosure',
    leaders: [
      { company: 'Microsoft', initiative: 'Internal carbon pricing system' },
      { company: 'Unilever', initiative: 'Supply chain carbon transparency platform' },
      { company: 'Walmart', initiative: 'Supplier emissions reporting infrastructure' },
    ],
  },
  'Supply Chain': {
    takeaways: [
      'Supplier visibility creates faster operational decision-making.',
      'Traceability programs reduce disruption exposure.',
      'Carbon-aware procurement improves resilience and cost planning.',
    ],
    roadmap: [
      'Identify tier-one and tier-two sustainability risks.',
      'Digitize supplier reporting workflows.',
      'Embed sustainability metrics into sourcing decisions.',
      'Monitor performance through quarterly governance reviews.',
    ],
    bestFitIndustries: ['Manufacturing', 'Consumer Goods', 'Logistics'],
    businessRelevance: 'Carbon supply chain optimization',
    leaders: [
      { company: 'Unilever', initiative: 'Supplier sustainability scorecards' },
      { company: 'Walmart', initiative: 'Supply chain emissions reporting infrastructure' },
      { company: 'Maersk', initiative: 'Low-emissions logistics transition planning' },
    ],
  },
  'Governance & Policy': {
    takeaways: [
      'Governance readiness reduces compliance surprises.',
      'Board-level ESG oversight improves strategic credibility.',
      'Strong controls help organizations scale sustainability programs.',
    ],
    roadmap: [
      'Assess governance gaps against regulatory expectations.',
      'Define executive accountability for sustainability metrics.',
      'Create internal reporting and escalation workflows.',
      'Align disclosures with investor-facing communications.',
    ],
    bestFitIndustries: ['Financial Services', 'Healthcare', 'Public Companies'],
    businessRelevance: 'ESG reporting regulation',
    leaders: [
      { company: 'BlackRock', initiative: 'Governance-linked climate disclosure expectations' },
      { company: 'Microsoft', initiative: 'Enterprise sustainability governance model' },
      { company: 'Siemens', initiative: 'Board-integrated ESG oversight systems' },
    ],
  },
  'Social Impact': {
    takeaways: [
      'Social impact strategy strengthens stakeholder trust.',
      'Workforce-centered sustainability improves retention.',
      'Community resilience initiatives reinforce long-term license to operate.',
    ],
    roadmap: [
      'Map social risk across workers and communities.',
      'Prioritize measurable inclusion and well-being indicators.',
      'Integrate social targets into operating reviews.',
      'Report outcomes to employees and external stakeholders.',
    ],
    bestFitIndustries: ['Healthcare', 'Retail', 'Consumer Services'],
    businessRelevance: 'Workforce and stakeholder resilience',
    leaders: [
      { company: 'Patagonia', initiative: 'Community and supply chain social impact programs' },
      { company: 'Salesforce', initiative: 'Stakeholder equity and workforce inclusion initiatives' },
      { company: 'Starbucks', initiative: 'Employee and community sustainability commitments' },
    ],
  },
  'Sustainable Innovation': {
    takeaways: [
      'Sustainable product innovation opens new market opportunities.',
      'Digital tools accelerate resource-efficiency gains.',
      'Innovation portfolios perform better when ESG metrics are built in early.',
    ],
    roadmap: [
      'Identify innovation use cases tied to sustainability KPIs.',
      'Pilot digital or process redesign opportunities.',
      'Measure performance improvements with cross-functional teams.',
      'Scale successful pilots into core operations.',
    ],
    bestFitIndustries: ['Technology', 'Manufacturing', 'Energy'],
    businessRelevance: 'Energy efficiency strategy',
    leaders: [
      { company: 'Tesla', initiative: 'Integrated low-carbon innovation platform' },
      { company: 'Schneider Electric', initiative: 'Digital energy efficiency solutions' },
      { company: '3M', initiative: 'Operational sustainability innovation pipeline' },
    ],
  },
  'Responsible Finance': {
    takeaways: [
      'Sustainability-linked finance can accelerate strategic transitions.',
      'Transparent ESG metrics improve access to capital.',
      'Climate-adjusted financial planning reduces downside risk.',
    ],
    roadmap: [
      'Assess climate and ESG exposure in core financial decisions.',
      'Integrate sustainability metrics into capital allocation.',
      'Link internal reporting to investor disclosure expectations.',
      'Track returns from sustainability-linked initiatives over time.',
    ],
    bestFitIndustries: ['Banking', 'Asset Management', 'Corporate Finance'],
    businessRelevance: 'Climate finance and disclosure strategy',
    leaders: [
      { company: 'HSBC', initiative: 'Sustainability-linked financing frameworks' },
      { company: 'Goldman Sachs', initiative: 'Climate transition finance products' },
      { company: 'BlackRock', initiative: 'ESG-integrated investment stewardship' },
    ],
  },
};

export const IndustryDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(THEMES[0]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isConsultingOpen, setIsConsultingOpen] = useState(false);
  const leadershipMetrics = useMemo(() => getLeadershipMetrics(), []);
  const sdgMetrics = useMemo(() => getSDGMetrics(), []);
  const facultyData = useMemo(() => getFacultyData(), []);

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
  const allThemePubs = MOCK_PUBLICATIONS.filter(p => p.top_1 === activeTab || p.top_2 === activeTab);
  const themeContent = INDUSTRY_THEME_CONTENT[activeTab] ?? INDUSTRY_THEME_CONTENT['Climate & Carbon'];

  const topExperts = useMemo(() => {
    const counts = new Map<string, { count: number; themes: string[] }>();

    allThemePubs.forEach((pub) => {
      const current = counts.get(pub.person_uuid) ?? { count: 0, themes: [] };
      current.count += 1;
      current.themes = Array.from(new Set([...current.themes, pub.top_1, pub.top_2, pub.top_3].filter(Boolean))).slice(0, 2);
      counts.set(pub.person_uuid, current);
    });

    return Array.from(counts.entries())
      .map(([uuid, data]) => {
        const faculty = facultyData.find((item) => item.uuid === uuid);
        return {
          uuid,
          name: faculty?.name ?? allThemePubs.find((pub) => pub.person_uuid === uuid)?.author_name ?? 'Unknown Expert',
          department: faculty?.department ?? allThemePubs.find((pub) => pub.person_uuid === uuid)?.department ?? 'Unknown Department',
          expertise: data.themes,
          publications: data.count,
        };
      })
      .sort((a, b) => b.publications - a.publications)
      .slice(0, 3);
  }, [allThemePubs, facultyData]);

  const evidenceSummary = {
    academicPublications: allThemePubs.length,
    collaborationStudies: Math.min(3, allThemePubs.filter((pub) => pub.pinecone_complete).length),
    policyResearchReports: Math.min(2, allThemePubs.filter((pub) => pub.top_2 === 'Governance & Policy' || pub.top_3 === 'Governance & Policy').length),
  };

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
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Strategic Insights for Industry</p>
            <p className="text-sm text-gray-500 mb-4">Research translated into actionable business strategy for climate and sustainability challenges.</p>
            <h3 className="text-2xl font-serif font-medium text-gray-900 mb-4">
              Implementing {activeTab} Strategies in 2025
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Based on recent studies from Gies faculty, businesses can leverage new frameworks in {activeTab.toLowerCase()} to drive competitive advantage. 
              Key findings suggest a 15% efficiency gain when integrating these practices early in the product lifecycle.
            </p>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Business Takeaways</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {themeContent.takeaways.map((takeaway) => (
                  <li key={takeaway}>• {takeaway}</li>
                ))}
              </ul>
            </div>
            
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
                <p className="text-sm text-gray-600">{themeContent.bestFitIndustries.join(' • ')}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
                <h4 className="font-medium text-gray-900 mb-2">Implementation Roadmap</h4>
                <ol className="space-y-1 text-sm text-gray-600">
                  {themeContent.roadmap.map((step, index) => (
                    <li key={step}>{index + 1}. {step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
            <h3 className="font-serif text-lg mb-4">Expert Connect</h3>
            <p className="text-gray-300 text-sm mb-6">
              Connect with Gies faculty and student teams working on {activeTab}.
            </p>
            <div className="space-y-3 mb-6">
              <div className="text-xs font-medium uppercase tracking-wide text-gray-400">Top Experts in This Topic</div>
              {topExperts.map((expert) => (
                <div key={expert.uuid} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white shrink-0">
                    {expert.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{expert.name}</div>
                    <div className="text-xs text-gray-300 mb-1">Expertise: {expert.expertise.join(', ')}</div>
                    <div className="text-xs text-gray-400">{expert.publications} Publications</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Link
                to="/faculty"
                className="inline-flex w-full justify-center py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Find Experts
              </Link>
              <button
                onClick={() => setIsConsultingOpen(true)}
                className="w-full py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/15 transition-colors border border-white/10"
              >
                Start a Consulting Request
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">Industry Leaders</h3>
            <div className="space-y-4">
              {themeContent.leaders.map((leader) => (
                <div key={leader.company}>
                  <div className="text-sm font-medium text-gray-900">{leader.company}</div>
                  <div className="text-sm text-gray-600">{leader.initiative}</div>
                </div>
              ))}
            </div>
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
            <h3 className="font-medium text-gray-900 mb-2">Partner with Gies Sustainability Initiative</h3>
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

