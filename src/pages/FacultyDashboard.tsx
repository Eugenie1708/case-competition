import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFacultyData, getLeadershipMetrics } from '../utils/transformData';
import { KPICard } from '../components/KPICard';
import { FacultyTable } from '../components/FacultyTable';
import { Search, Filter } from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate();
  const facultyData = useMemo(() => getFacultyData(), []);
  const leadershipMetrics = useMemo(() => getLeadershipMetrics(), []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaculty = facultyData.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-serif font-medium text-gray-900">Faculty Dashboard</h2>
          <p className="text-gray-500 mt-1">Track research impact and identify collaborators.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search faculty..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard 
          title="Total Publications" 
          value={leadershipMetrics.totalPublications} 
          trend="+12%" 
          trendDirection="up" 
        />
        <KPICard 
          title="Active Researchers" 
          value={leadershipMetrics.activeFaculty} 
          trend="Stable" 
          trendDirection="neutral" 
        />
        <KPICard 
          title="Avg. Pubs / Faculty" 
          value={(leadershipMetrics.totalPublications / leadershipMetrics.activeFaculty).toFixed(1)} 
          trend="+0.2" 
          trendDirection="up" 
        />
        <KPICard 
          title="Top Department" 
          value={leadershipMetrics.topDepartments[0]?.name || "N/A"} 
          trend="Leading" 
          trendDirection="up" 
          valueClassName="text-xl truncate block w-full"
        />
      </div>

      {/* Faculty Table */}
      <FacultyTable facultyList={filteredFaculty} />
    </div>
  );
};

