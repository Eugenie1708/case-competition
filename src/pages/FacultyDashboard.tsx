import React, { useMemo } from 'react';
import { getFacultyData, getLeadershipMetrics } from '../utils/transformData';
import { KPICard } from '../components/KPICard';
import { FacultyTable } from '../components/FacultyTable';
import { DashboardPageHeader } from '../components/DashboardPageHeader';
import { Filter } from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const facultyData = useMemo(() => getFacultyData(), []);
  const leadershipMetrics = useMemo(() => getLeadershipMetrics(), []);

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Faculty Dashboard"
        subtitle="Track research impact and identify collaborators."
        sdgBasePath="/faculty/sdg"
        filterButton={
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 shrink-0">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        }
      />

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
      <FacultyTable facultyList={facultyData} />
    </div>
  );
};

