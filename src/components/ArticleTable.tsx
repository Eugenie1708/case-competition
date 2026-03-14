import React, { useMemo, useState } from 'react';
import { Publication } from '../data/publications';
import { SourceConfidenceTag } from './SourceConfidenceTag';
import { getConfidenceLevel } from '../utils/transformData';
import { SDG_INFO, getContrastTextClass, getPublicationSdgs } from '../utils/sdgUtils';

interface ArticleTableProps {
  publications: Publication[];
}

type SortKey = 'year' | 'journal' | 'sdg';
type SortDirection = 'asc' | 'desc';

export const ArticleTable: React.FC<ArticleTableProps> = ({ publications }) => {
  const [sortKey, setSortKey] = useState<SortKey>('year');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedPublications = useMemo(() => {
    const copy = [...publications];

    copy.sort((left, right) => {
      let comparison = 0;

      if (sortKey === 'year') {
        comparison = left.publication_year - right.publication_year;
      } else if (sortKey === 'journal') {
        comparison = left.journal_title.localeCompare(right.journal_title);
      } else {
        const leftGoal = getPublicationSdgs(left)[0] ?? 999;
        const rightGoal = getPublicationSdgs(right)[0] ?? 999;
        comparison = leftGoal - rightGoal;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return copy;
  }, [publications, sortDirection, sortKey]);

  const toggleSort = (key: SortKey) => {
    setSortDirection((currentDirection) => {
      if (sortKey !== key) {
        setSortKey(key);
        return key === 'year' ? 'desc' : 'asc';
      }

      return currentDirection === 'asc' ? 'desc' : 'asc';
    });

    if (sortKey !== key) {
      setSortKey(key);
    }
  };

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4 cursor-pointer select-none" onClick={() => toggleSort('year')}>Year{sortIndicator('year')}</th>
            <th className="py-3 px-4 cursor-pointer select-none" onClick={() => toggleSort('journal')}>Journal{sortIndicator('journal')}</th>
            <th className="py-3 px-4 cursor-pointer select-none" onClick={() => toggleSort('sdg')}>Related SDG Goals{sortIndicator('sdg')}</th>
            <th className="py-3 px-4">Confidence</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sortedPublications.map((pub) => {
            const sdgGoals = getPublicationSdgs(pub);

            return (
            <tr key={pub.article_uuid} className="hover:bg-gray-50 transition-colors group">
              <td className="py-3 px-4">
                <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                  {pub.title}
                </div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-1">{pub.abstract}</div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                {pub.publication_year}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {pub.journal_title}
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {sdgGoals.map((goal) => {
                    const color = SDG_INFO[goal].color;
                    return (
                      <div key={goal} className="group/goal relative inline-block">
                        <span
                          className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full transition-transform duration-150 group-hover/goal:scale-105 group-hover/goal:shadow-sm ${getContrastTextClass(color)}`}
                          style={{ backgroundColor: color }}
                        >
                          {goal}
                        </span>
                        <div className="pointer-events-none invisible absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[11px] font-medium text-gray-700 shadow-md ring-1 ring-gray-200 group-hover/goal:visible">
                          SDG {goal} - {SDG_INFO[goal].name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </td>
              <td className="py-3 px-4">
                <SourceConfidenceTag level={getConfidenceLevel(pub)} />
              </td>
            </tr>
          );})}
        </tbody>
      </table>
    </div>
  );
};
