import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ChevronRight } from 'lucide-react';
import { Faculty } from '../utils/transformData';

interface FacultyTableProps {
  facultyList: Faculty[];
}

export const FacultyTable: React.FC<FacultyTableProps> = ({ facultyList }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="py-3 px-6">Faculty Member</th>
            <th className="py-3 px-6">Department</th>
            <th className="py-3 px-6 text-center">Total Publications</th>
            <th className="py-3 px-6 text-center">SDG Publications</th>
            <th className="py-3 px-6">SDG Research Themes</th>
            <th className="py-3 px-6"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {facultyList.map((faculty) => (
            <tr 
              key={faculty.uuid} 
              onClick={() => navigate(`/faculty/${faculty.uuid}`)}
              title="View SDG publications and research contributions."
              className="hover:bg-orange-50/50 cursor-pointer transition-colors group"
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-orange-700 transition-colors">{faculty.name}</div>
                    <div className="text-xs text-gray-500">{faculty.email}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                {faculty.department}
              </td>
              <td className="py-4 px-6 text-center font-mono text-sm text-gray-600">
                {faculty.totalPublications}
              </td>
              <td className="py-4 px-6 text-center font-mono text-sm font-medium text-emerald-600 bg-emerald-50/30 rounded-lg">
                {faculty.sustainabilityPublications}
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-wrap gap-1">
                  {faculty.topThemes.map((theme, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full border border-gray-200">
                      {theme}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-orange-400" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
