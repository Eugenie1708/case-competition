import React, { useMemo } from 'react';
import { ArrowLeft, TrendingUp, BookOpen, Building2 } from 'lucide-react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { SDGIconRow } from '../components/SDGIconRow';
import { getSDGMetrics } from '../utils/transformData';

export const SDGDetailPage: React.FC = () => {
  const { goalId } = useParams<{ goalId: string }>();
  const sdgId = Number(goalId);

  const sdgMetric = useMemo(() => {
    return getSDGMetrics().find((metric) => metric.id === sdgId);
  }, [sdgId]);

  const publications = useMemo(() => {
    return [...(sdgMetric?.publications ?? [])].sort((a, b) => b.publication_year - a.publication_year);
  }, [sdgMetric]);

  if (!sdgMetric) {
    return <div className="text-sm text-gray-500">SDG goal not found.</div>;
  }

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide" style={{ backgroundColor: `${sdgMetric.color}1A`, color: sdgMetric.color }}>
              Goal {sdgMetric.id}
            </div>
            <h1 className="text-3xl font-serif font-medium text-gray-900">{sdgMetric.name}</h1>
            <p className="mt-2 text-sm text-gray-500">
              General SDG overview for Goal {sdgMetric.id} with trend-level context across dashboards.
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

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <BookOpen className="h-3.5 w-3.5" />
              Publications
            </div>
            <div className="text-xl font-semibold text-gray-900">{publications.length}</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <Building2 className="h-3.5 w-3.5" />
              Departments
            </div>
            <div className="text-xl font-semibold text-gray-900">
              {new Set(publications.map((pub) => pub.department)).size}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <TrendingUp className="h-3.5 w-3.5" />
              Latest Year
            </div>
            <div className="text-xl font-semibold text-gray-900">
              {publications[0]?.publication_year ?? 'N/A'}
            </div>
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
          <NavLink
            to={`/student/sdg/${sdgMetric.id}`}
            className="rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-100"
          >
            Student
          </NavLink>
          <NavLink
            to={`/faculty/sdg/${sdgMetric.id}`}
            className="rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-100"
          >
            Faculty
          </NavLink>
          <NavLink
            to={`/industry/sdg/${sdgMetric.id}`}
            className="rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-100"
          >
            Industry
          </NavLink>
        </div>
      </div>

      <SDGIconRow basePath="/sdg" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900">Overview Notes</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Use the Student, Faculty, or Industry tabs above to open the contextual SDG article pages.
          Each contextual page keeps the same goal while showing perspective-specific navigation and the full publication table.
        </p>
      </div>
    </div>
  );
};