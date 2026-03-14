import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { SDGPublicationTable } from '../components/SDGPublicationTable';
import { SDGIconRow } from '../components/SDGIconRow';
import { getSDGMetrics } from '../utils/transformData';

type SDGContext = 'student' | 'faculty' | 'industry';

interface SDGContextPageProps {
  context: SDGContext;
}

const contextMeta: Record<SDGContext, { label: string; pathPrefix: string; backPath: string }> = {
  student: { label: 'Student', pathPrefix: '/student/sdg', backPath: '/student' },
  faculty: { label: 'Faculty', pathPrefix: '/faculty/sdg', backPath: '/faculty' },
  industry: { label: 'Industry', pathPrefix: '/industry/sdg', backPath: '/industry' },
};

export const SDGContextPage: React.FC<SDGContextPageProps> = ({ context }) => {
  const { goalId } = useParams<{ goalId: string }>();
  const sdgId = Number(goalId);
  const meta = contextMeta[context];

  const sdgMetric = useMemo(() => {
    return getSDGMetrics().find((metric) => metric.id === sdgId);
  }, [sdgId]);

  const publications = useMemo(() => {
    return [...(sdgMetric?.publications ?? [])].sort((a, b) => b.publication_year - a.publication_year);
  }, [sdgMetric]);

  const pageDescription =
    context === 'student'
      ? 'This page helps students explore this SDG goal and identify faculty they can reach out to.'
      : `${meta.label} perspective: ${publications.length} publications mapped to this SDG.`;

  const sectionDescription =
    context === 'student'
      ? `Faculty publications for Goal ${sdgMetric?.id ?? ''} (${sdgMetric?.shortName ?? ''}) to help students discover research topics.`
      : `Publications for Goal ${sdgMetric?.id ?? ''} (${sdgMetric?.shortName ?? ''}) in the ${meta.label.toLowerCase()} context.`;

  const sectionTitle =
    context === 'student' ? 'Faculty SDG Publications' : `${meta.label} SDG Publications`;

  if (!sdgMetric) {
    return <div className="text-sm text-gray-500">SDG goal not found.</div>;
  }

  return (
    <div className="space-y-6">
      <Link
        to={meta.backPath}
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {meta.label} Dashboard
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
              style={{ backgroundColor: `${sdgMetric.color}1A`, color: sdgMetric.color }}
            >
              Goal {sdgMetric.id}
            </div>
            <h1 className="text-3xl font-serif font-medium text-gray-900">{sdgMetric.name}</h1>
            <p className="mt-2 text-sm text-gray-500">
              {pageDescription}
            </p>
          </div>

          <div className="h-24 w-24 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <img
              src={sdgMetric.image}
              alt={sdgMetric.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
          <NavLink
            to={`/sdg/${sdgMetric.id}`}
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            Overview
          </NavLink>
          {(Object.keys(contextMeta) as SDGContext[]).map((ctx) => {
            const tab = contextMeta[ctx];
            return (
              <NavLink
                key={ctx}
                to={`${tab.pathPrefix}/${sdgMetric.id}`}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                  }`
                }
              >
                {tab.label}
              </NavLink>
            );
          })}
        </div>
      </div>

      <SDGIconRow basePath={meta.pathPrefix} />

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900">{sectionTitle}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {sectionDescription}
          </p>
        </div>
        <SDGPublicationTable publications={publications} />
      </div>
    </div>
  );
};