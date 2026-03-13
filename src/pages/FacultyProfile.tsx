import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFacultyData } from '../utils/transformData';
import { MOCK_PUBLICATIONS } from '../data/publications';
import { ArticleTable } from '../components/ArticleTable';
import { ArrowLeft, Mail, Building2, Award, BookOpen } from 'lucide-react';

export const FacultyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const facultyData = useMemo(() => getFacultyData(), []);
  
  const faculty = facultyData.find(f => f.uuid === id);
  const publications = MOCK_PUBLICATIONS.filter(p => p.person_uuid === id);

  if (!faculty) {
    return <div>Faculty member not found</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Link to="/faculty" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Faculty Dashboard
      </Link>

      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8 items-start">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-4xl text-gray-400 border-4 border-white shadow-lg shrink-0">
          {faculty.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-serif font-medium text-gray-900 mb-2">{faculty.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {faculty.department}
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {faculty.email}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Total Impact</div>
              <div className="text-3xl font-semibold text-gray-900">{faculty.totalPublications}</div>
              <div className="text-xs text-emerald-600 font-medium">Publications</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-500" />
              Research Focus & Expertise
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Leading research in <strong>{faculty.topThemes.join(", ")}</strong>. 
              Their work primarily focuses on the intersection of {faculty.topThemes[0]} and business strategy, 
              contributing significantly to the understanding of sustainable practices in modern enterprises.
            </p>
          </div>

          <div className="flex gap-2">
            {faculty.topThemes.map((theme, idx) => (
              <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Publications Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gray-400" />
            Publications
          </h3>
          <span className="text-sm text-gray-500">{publications.length} items found</span>
        </div>
        <ArticleTable publications={publications} />
      </div>
    </div>
  );
};
