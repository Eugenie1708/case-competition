import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Publication } from '../data/publications';

interface SDGPublicationTableProps {
  publications: Publication[];
}

export const SDGPublicationTable: React.FC<SDGPublicationTableProps> = ({ publications }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[980px] text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Author</th>
            <th className="py-3 px-4">Department</th>
            <th className="py-3 px-4">Publication Year</th>
            <th className="py-3 px-4">Data Source Date</th>
            <th className="py-3 px-4">Link</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {publications.map((pub) => (
            <tr key={pub.article_uuid} className="group transition-colors hover:bg-gray-50">
              <td className="py-4 px-4">
                <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                  {pub.title}
                </div>
                <div className="mt-1 text-xs text-gray-500 line-clamp-2">{pub.journal_title}</div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{pub.author_name}</td>
              <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{pub.department}</td>
              <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{pub.publication_year}</td>
              <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{pub.data_source_date}</td>
              <td className="py-4 px-4">
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                  View
                  <ExternalLink className="h-4 w-4" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};