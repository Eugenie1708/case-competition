import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { SDGPublicationTable } from '../components/SDGPublicationTable';
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
              {publications.length} sustainability publications mapped to this SDG goal.
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
      </div>

      <SDGIconRow />

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900">Goal {sdgMetric.id} Publications</h2>
          <p className="mt-1 text-sm text-gray-500">Filtered dynamically from the sustainability publication dataset.</p>
        </div>
        <SDGPublicationTable publications={publications} />
      </div>
    </div>
  );
};