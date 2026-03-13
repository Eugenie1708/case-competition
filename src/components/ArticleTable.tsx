import React from 'react';
import { Publication } from '../data/publications';
import { SourceConfidenceTag } from './SourceConfidenceTag';
import { getConfidenceLevel } from '../utils/transformData';
import { FileText, Calendar, ExternalLink } from 'lucide-react';

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
            <th className="py-3 px-4">Themes</th>
            <th className="py-3 px-4">Confidence</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {publications.map((pub) => (
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
                  {[pub.top_1, pub.top_2].filter(Boolean).map((theme, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full border border-gray-200">
                      {theme}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4">
                <SourceConfidenceTag level={getConfidenceLevel(pub)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
