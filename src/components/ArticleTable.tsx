import React from 'react';
import { Publication } from '../data/publications';
import { SourceConfidenceTag } from './SourceConfidenceTag';
import { getConfidenceLevel } from '../utils/transformData';

const SDG_COLORS: Record<number, string> = {
  1: '#E5243B',
  2: '#DDA63A',
  3: '#4C9F38',
  4: '#C5192D',
  5: '#FF3A21',
  6: '#26BDE2',
  7: '#FCC30B',
  8: '#A21942',
  9: '#FD6925',
  10: '#DD1367',
  11: '#FD9D24',
  12: '#BF8B2E',
  13: '#3F7E44',
  14: '#0A97D9',
  15: '#56C02B',
  16: '#00689D',
  17: '#19486A',
};

function getContrastTextClass(hex: string): string {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 160 ? 'text-gray-900' : 'text-white';
}

function getPublicationSdgs(pub: Publication): number[] {
  if (pub.sdgs && pub.sdgs.length > 0) {
    return Array.from(new Set(pub.sdgs.filter((id) => id >= 1 && id <= 17)));
  }

  return Array.from(
    new Set(
      [pub.top_1, pub.top_2, pub.top_3]
        .map((value) => Math.trunc(Number.parseFloat(String(value))))
        .filter((id) => Number.isFinite(id) && id >= 1 && id <= 17),
    ),
  );
}

interface ArticleTableProps {
  publications: Publication[];
}

export const ArticleTable: React.FC<ArticleTableProps> = ({ publications }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Year</th>
            <th className="py-3 px-4">Journal</th>
            <th className="py-3 px-4">Related SDG Goals</th>
            <th className="py-3 px-4">Confidence</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {publications.map((pub) => {
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
                    const color = SDG_COLORS[goal];
                    return (
                      <span
                        key={goal}
                        className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getContrastTextClass(color)}`}
                        style={{ backgroundColor: color }}
                        title={`SDG ${goal}`}
                      >
                        {goal}
                      </span>
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
