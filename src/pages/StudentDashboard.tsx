import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { getThemeMetrics, getLeadershipMetrics, getSDGMetrics } from '../utils/transformData';
import { KPICard } from '../components/KPICard';
import { SourceConfidenceTag } from '../components/SourceConfidenceTag';
import { FilterDrawer } from '../components/FilterDrawer';
import { DashboardPageHeader } from '../components/DashboardPageHeader';
import { Filter } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const themeMetrics = useMemo(() => getThemeMetrics(), []);
  const sdgMetrics = useMemo(() => getSDGMetrics(), []);
  const leadershipMetrics = useMemo(() => getLeadershipMetrics(), []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#6366F1'];

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Student Dashboard"
        subtitle="Explore research themes and find faculty mentors."
        sdgBasePath="/student/sdg"
        actions={
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        }
      />

      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard 
          title="Total Publications" 
          value={leadershipMetrics.totalPublications} 
          trend="+5%" 
          trendDirection="up" 
        />
        <KPICard 
          title="Active Faculty" 
          value={leadershipMetrics.activeFaculty} 
          trend="Stable" 
          trendDirection="neutral" 
        />
        <KPICard 
          title="Top SDG" 
          value={sdgMetrics[0]?.shortName || "N/A"} 
          trend="High Interest" 
          trendDirection="up" 
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SDG Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-gray-900">Publications by SDG</h3>
            <SourceConfidenceTag level="High" source="Pinecone" />
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={sdgMetrics.slice(0, 10)} 
                layout="vertical" 
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                onClick={(data: any) => {
                  if (data && data.activePayload && data.activePayload[0]) {
                    navigate(`/student/sdg/${data.activePayload[0].payload.id}`);
                  }
                }}
                className="cursor-pointer"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="shortName" 
                  type="category" 
                  width={100} 
                  tick={{ fontSize: 11, fill: '#4B5563' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                  {sdgMetrics.slice(0, 10).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">Click a bar to view details</p>
        </div>

        {/* Department Contribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-gray-900">Department Contribution</h3>
            <SourceConfidenceTag level="Medium" source="Derived" />
          </div>
          <div className="h-80 flex items-center justify-center">
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

      {/* Emerging Topics */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-4">Emerging Sustainability Topics (Keywords)</h3>
        <div className="flex flex-wrap gap-2">
          {["Circular Economy", "Green Bonds", "ESG Reporting", "Carbon Pricing", "Social Entrepreneurship", "Supply Chain Transparency", "Impact Investing"].map((tag, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-sm border border-gray-200 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
