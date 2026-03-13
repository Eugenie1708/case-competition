import React, { useMemo } from 'react';
import { getLeadershipMetrics, getThemeMetrics, getSDGMetrics } from '../utils/transformData';
import { KPICard } from '../components/KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Share2 } from 'lucide-react';

export const LeadershipDashboard: React.FC = () => {
  const leadershipMetrics = useMemo(() => getLeadershipMetrics(), []);
  const themeMetrics = useMemo(() => getThemeMetrics(), []);
  const sdgMetrics = useMemo(() => getSDGMetrics(), []);

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#6366F1'];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-serif font-medium text-gray-900">Strategic Overview</h2>
          <p className="text-gray-500 mt-1">High-level summary of sustainability research activity, trends, and key institutional insights.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard 
          title="Total Publications" 
          value={leadershipMetrics.totalPublications} 
          trend="+8% YoY" 
          trendDirection="up" 
        />
        <KPICard 
          title="Active Faculty" 
          value={leadershipMetrics.activeFaculty} 
          trend="Stable" 
          trendDirection="neutral" 
        />
        <KPICard 
          title="Top Department" 
          value={leadershipMetrics.topDepartments[0]?.name || "N/A"} 
          trend="Leading" 
          trendDirection="up" 
          valueClassName="text-xl truncate block w-full"
        />
        <KPICard 
          title="Data Confidence" 
          value="92%" 
          trend="High" 
          trendDirection="up" 
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-6">Publication Growth (Yearly)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadershipMetrics.publicationsByYear}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#EA580C" strokeWidth={3} dot={{ r: 4, fill: '#EA580C', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-6">Department Contribution</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadershipMetrics.topDepartments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {leadershipMetrics.topDepartments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {leadershipMetrics.topDepartments.slice(0, 4).map((dept, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span className="text-xs text-gray-600">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-6">Strategic Theme Alignment</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={themeMetrics} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11, fill: '#4B5563' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} />
                <Bar dataKey="count" fill="#4B5563" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-6">Top SDG Focus Areas</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sdgMetrics.slice(0, 8)} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis dataKey="shortName" type="category" width={100} tick={{ fontSize: 11, fill: '#4B5563' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                  {sdgMetrics.slice(0, 8).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Strength</div>
          <h4 className="font-serif font-medium text-gray-900 mb-2">Supply Chain Dominance</h4>
          <p className="text-sm text-gray-600">
            Gies is establishing a clear leadership position in sustainable supply chain research, outperforming other themes by 20%.
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100 shadow-sm">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Opportunity</div>
          <h4 className="font-serif font-medium text-gray-900 mb-2">Cross-Disciplinary Growth</h4>
          <p className="text-sm text-gray-600">
            Potential to increase collaboration between Finance and Accountancy departments on "Responsible Finance" topics.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 shadow-sm">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">Impact</div>
          <h4 className="font-serif font-medium text-gray-900 mb-2">Industry Relevance</h4>
          <p className="text-sm text-gray-600">
            85% of recent publications align directly with current Fortune 500 sustainability goals, indicating high relevance.
          </p>
        </div>
      </div>
    </div>
  );
};
