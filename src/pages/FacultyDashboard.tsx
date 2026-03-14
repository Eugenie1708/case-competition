import React, { useMemo, useState } from 'react';
import { getFacultyData, getLeadershipMetrics } from '../utils/transformData';
import { KPICard } from '../components/KPICard';
import { FacultyTable } from '../components/FacultyTable';
import { FilterDrawer } from '../components/FilterDrawer';
import { DashboardPageHeader } from '../components/DashboardPageHeader';
import { Filter } from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const facultyData = useMemo(() => getFacultyData(), []);
  const leadershipMetrics = useMemo(() => getLeadershipMetrics(), []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="space-y-6">
      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <DashboardPageHeader
        title="Faculty Dashboard"
        subtitle="Explore sustainability research impact, discover active faculty, and identify potential collaborators."
        sdgBasePath="/faculty/sdg"
        sdgHelperText="Select an SDG to explore related faculty research."
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard 
          title="Total SDG Publications" 
          value={leadershipMetrics.totalPublications} 
          trend="+12%" 
          trendDirection="up" 
        />
        <KPICard 
          title="Active SDG Researchers" 
          value={leadershipMetrics.activeFaculty} 
          trend="Stable" 
          trendDirection="neutral" 
        />
        <KPICard 
          title="Avg SDG Pubs / Faculty" 
          value={(leadershipMetrics.totalPublications / leadershipMetrics.activeFaculty).toFixed(1)} 
          trend="+0.2" 
          trendDirection="up" 
        />
        <KPICard 
          title="Top Contributing Department" 
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

