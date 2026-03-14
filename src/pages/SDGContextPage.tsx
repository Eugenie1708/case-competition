import React, { useMemo } from 'react';
import { ArrowLeft, Search, User } from 'lucide-react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SDGPublicationTable } from '../components/SDGPublicationTable';
import { SDGIconRow } from '../components/SDGIconRow';
import { getSDGMetrics } from '../utils/transformData';

type SDGContext = 'student' | 'faculty' | 'industry';

interface SDGContextPageProps {
  context: SDGContext;
}

const contextMeta: Record<SDGContext, { label: string; pathPrefix: string; backPath: string }> = {
  student: { label: 'Student', pathPrefix: '/student/sdg', backPath: '/student' },
  faculty: { label: 'Faculty', pathPrefix: '/faculty/sdg', backPath: '/faculty' },
  industry: { label: 'Industry', pathPrefix: '/industry/sdg', backPath: '/industry' },
};

const sdgOverview: Record<number, string> = {
  1: 'SDG 1 aims to end extreme poverty and expand access to economic opportunity and social protection. Academic research helps measure poverty patterns, test policy interventions, and evaluate long-term development outcomes. For students, this topic connects business decisions with real-world social impact and inclusive growth.',
  2: 'SDG 2 focuses on ending hunger and improving food security through sustainable systems. Research contributes by analyzing supply chains, agricultural innovation, and nutrition policy effectiveness. Students gain insight into how management and innovation can strengthen global food resilience.',
  3: 'SDG 3 promotes healthy lives and well-being across communities and life stages. Academic work supports this goal through healthcare innovation, public health policy analysis, and operations improvement. For students, it shows how data-driven decisions can improve outcomes at scale.',
  4: 'SDG 4 seeks inclusive, equitable, and high-quality education for all. Research explores access gaps, learning outcomes, and the impact of technology-enabled education models. Students can use these insights to understand how leadership and policy shape future talent pipelines.',
  5: 'SDG 5 advances gender equality and empowerment in institutions and society. Academic studies examine representation, pay equity, workplace systems, and policy reform effectiveness. For students, this goal highlights how equitable structures improve performance and innovation.',
  6: 'SDG 6 aims to ensure clean water and sanitation through sustainable resource management. Research evaluates water governance, infrastructure performance, and environmental risk mitigation. Students see how interdisciplinary problem solving supports health, equity, and resilience.',
  7: 'SDG 7 promotes affordable, reliable, and clean energy transitions. Research contributes through renewable energy technology, financing models, and policy design. For students, this area demonstrates how sustainability strategy and innovation drive long-term competitiveness.',
  8: 'SDG 8 focuses on sustainable economic growth, productive employment, and decent work. Academic research analyzes labor markets, entrepreneurship ecosystems, and inclusive growth strategies. Students can connect this goal to career development, responsible leadership, and economic resilience.',
  9: 'SDG 9 supports resilient infrastructure, sustainable industry, and innovation capacity. Research investigates technology adoption, industrial systems, and infrastructure planning. For students, it illustrates how innovation and operations strategy shape development outcomes.',
  10: 'SDG 10 aims to reduce inequality within and across countries. Academic studies address income mobility, institutional barriers, and policy mechanisms for inclusion. Students can learn how analytics and governance choices influence fairness and opportunity.',
  11: 'SDG 11 promotes sustainable, safe, and inclusive cities and communities. Research examines urban planning, transport systems, housing, and disaster resilience. For students, this topic shows how business, policy, and technology intersect in everyday quality of life.',
  12: 'SDG 12 focuses on responsible consumption and production across value chains. Research evaluates circular economy models, sustainable operations, and resource efficiency metrics. Students gain practical insight into how organizations can reduce waste while creating value.',
  13: 'SDG 13 calls for urgent climate action through mitigation and adaptation strategies. Academic work analyzes emissions policy, climate risk, and transition pathways for industries. For students, this goal is central to understanding future-ready leadership and decision making.',
  14: 'SDG 14 aims to conserve oceans and marine resources for sustainable development. Research contributes through fisheries management, pollution monitoring, and marine ecosystem protection studies. Students can see how policy and innovation affect long-term environmental stewardship.',
  15: 'SDG 15 focuses on protecting terrestrial ecosystems, biodiversity, and land resources. Academic studies examine conservation models, land-use policy, and restoration outcomes. For students, it highlights the links between ecological health, economic systems, and social well-being.',
  16: 'SDG 16 promotes peace, justice, and strong institutions through accountable governance. Research explores institutional trust, legal systems, transparency, and anti-corruption measures. Students benefit by understanding how governance quality shapes development and markets.',
  17: 'SDG 17 emphasizes global partnerships to accelerate sustainable development progress. Academic research studies collaboration models, development finance, and cross-sector coordination. For students, this goal reinforces the importance of networks and collective action in solving complex problems.',
};

export const SDGContextPage: React.FC<SDGContextPageProps> = ({ context }) => {
  const { goalId } = useParams<{ goalId: string }>();
  const sdgId = Number(goalId);
  const meta = contextMeta[context];

  const sdgMetric = useMemo(() => {
    return getSDGMetrics().find((metric) => metric.id === sdgId);
  }, [sdgId]);

  const publications = useMemo(() => {
    return [...(sdgMetric?.publications ?? [])].sort((a, b) => b.publication_year - a.publication_year);
  }, [sdgMetric]);

  const pageDescription =
    context === 'student'
      ? 'This page helps students explore this SDG goal and identify faculty they can reach out to.'
      : `${meta.label} perspective: ${publications.length} publications mapped to this SDG.`;

  const sectionDescription =
    context === 'student'
      ? 'Faculty publications related to this SDG that may help students explore research topics and identify potential mentors.'
      : `Publications for Goal ${sdgMetric?.id ?? ''} (${sdgMetric?.shortName ?? ''}) in the ${meta.label.toLowerCase()} context.`;

  const sectionTitle =
    context === 'student' ? 'Publications' : `${meta.label} SDG Publications`;

  const trendData = useMemo(() => {
    const counts = new Map<number, number>();
    publications.forEach((pub) => {
      if (pub.publication_year > 0) {
        counts.set(pub.publication_year, (counts.get(pub.publication_year) || 0) + 1);
      }
    });

    return Array.from(counts.entries())
      .map(([year, count]) => ({ year: String(year), count }))
      .sort((a, b) => Number(a.year) - Number(b.year));
  }, [publications]);

  if (!sdgMetric) {
    return <div className="text-sm text-gray-500">SDG goal not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-3">
        <div className="relative w-64">
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

      <Link
        to={meta.backPath}
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {meta.label} Dashboard
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
              style={{ backgroundColor: `${sdgMetric.color}1A`, color: sdgMetric.color }}
            >
              Goal {sdgMetric.id}
            </div>
            <h1 className="text-3xl font-serif font-medium text-gray-900">{sdgMetric.name}</h1>
            <p className="mt-2 text-sm text-gray-500">
              {pageDescription}
            </p>
          </div>

          <div className="h-24 w-24 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <img
              src={sdgMetric.image}
              alt={sdgMetric.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
          <NavLink
            to={`/sdg/${sdgMetric.id}`}
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            Overview
          </NavLink>
          {(Object.keys(contextMeta) as SDGContext[]).map((ctx) => {
            const tab = contextMeta[ctx];
            return (
              <NavLink
                key={ctx}
                to={`${tab.pathPrefix}/${sdgMetric.id}`}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                  }`
                }
              >
                {tab.label}
              </NavLink>
            );
          })}
        </div>
      </div>

      {context === 'student' ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Overview</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">{sdgOverview[sdgMetric.id]}</p>
        </div>
      ) : null}

      {context === 'student' ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Trend</h2>
          <p className="mt-1 text-sm text-gray-500">Publication trend over time for this SDG.</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="year" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill={sdgMetric.color} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}

      <SDGIconRow basePath={meta.pathPrefix} />

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900">{sectionTitle}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {sectionDescription}
          </p>
        </div>
        <SDGPublicationTable publications={publications} />
      </div>
    </div>
  );
};