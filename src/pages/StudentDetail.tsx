import React, { useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { getThemeMetrics, getConfidenceLevel, getSDGMetrics, getSDGNews } from '../utils/transformData';
import { SourceConfidenceTag } from '../components/SourceConfidenceTag';
import { ArrowLeft, FileText, User, Calendar, Newspaper } from 'lucide-react';

export const StudentDetail: React.FC = () => {
  const { theme } = useParams<{ theme: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type'); // 'sdg' or 'theme' (default)
  const backLink = type === 'sdg' ? '/' : '/student';

  const themeMetrics = useMemo(() => getThemeMetrics(), []);
  const sdgMetrics = useMemo(() => getSDGMetrics(), []);
  
  let currentGroup;
  let publications = [];

  if (type === 'sdg') {
    currentGroup = sdgMetrics.find(t => t.name === decodeURIComponent(theme || ''));
    publications = currentGroup?.publications || [];
  } else {
    currentGroup = themeMetrics.find(t => t.name === decodeURIComponent(theme || ''));
    publications = currentGroup?.publications || [];
  }

  const news = useMemo(() => {
    if (type === 'sdg' && currentGroup && 'id' in currentGroup) {
      return getSDGNews(currentGroup.id);
    }
    return [];
  }, [type, currentGroup]);

  const sortedPublications = useMemo(() => {
    return [...publications].sort((a, b) => b.publication_year - a.publication_year);
  }, [publications]);

  if (!currentGroup) {
    return <div>Category not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link to={backLink} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
             <h2 className="text-2xl font-serif font-medium text-gray-900">{currentGroup.name}</h2>
             {type === 'sdg' && (
               <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs font-bold rounded">SDG</span>
             )}
          </div>
          <p className="text-gray-500">Showing {publications.length} publications in this category</p>
        </div>
      </div>

      {/* News Section (Only for SDG) */}
      {type === 'sdg' && news.length > 0 && (
        <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-medium text-gray-900">Latest News & Updates</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {news.map(item => (
              <div key={item.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-orange-200 transition-colors cursor-pointer group">
                <div className="text-xs text-orange-600 font-medium mb-2">{item.source} • {item.date}</div>
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-orange-700 leading-snug">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Latest Publications</h3>
        {sortedPublications.map((pub) => (
          <div key={pub.article_uuid} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded font-medium">{pub.top_1}</span>
                {pub.top_2 && <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">{pub.top_2}</span>}
              </div>
              <SourceConfidenceTag level={getConfidenceLevel(pub)} source={pub.source} />
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">{pub.title}</h3>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span className="text-gray-700">{pub.author_name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{pub.publication_year}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span className="italic">{pub.journal_title}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
              {pub.abstract}
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-400 font-mono">DOI: {pub.doi}</div>
              <Link to={`/faculty/${pub.person_uuid}`} className="text-sm font-medium text-orange-600 hover:text-orange-700">
                View Faculty Profile &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
