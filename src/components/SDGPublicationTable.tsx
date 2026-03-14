import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Publication } from '../data/publications';

interface SDGPublicationTableProps {
  publications: Publication[];
}

export const SDGPublicationTable: React.FC<SDGPublicationTableProps> = ({ publications }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.max(1, Math.ceil(publications.length / rowsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [publications]);

  const pagedPublications = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return publications.slice(start, start + rowsPerPage);
  }, [currentPage, publications]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Publication Year</th>
              <th className="py-3 px-4">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pagedPublications.map((pub) => (
              <tr key={pub.article_uuid} className="group transition-colors hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="relative inline-block max-w-xl">
                    <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                      {pub.title}
                    </div>
                    <div className="pointer-events-none invisible absolute left-0 top-full z-20 mt-2 w-96 rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-600 shadow-lg group-hover:visible">
                      {pub.summary}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500 line-clamp-2">{pub.journal_title}</div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{pub.author_name}</td>
                <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{pub.department}</td>
                <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{pub.publication_year}</td>
                <td className="py-4 px-4">
                  <a
                    href={pub.doi ? `https://doi.org/${pub.doi}` : '#'}
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

      <div className="flex items-center justify-center gap-2 border-t border-gray-100 px-4 py-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`h-8 min-w-8 rounded-md px-2 text-sm font-medium transition-colors ${
              pageNumber === currentPage
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};