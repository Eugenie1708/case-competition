import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { SDGS } from '../utils/transformData';

interface SDGIconRowProps {
  basePath?: string;
}

export const SDGIconRow: React.FC<SDGIconRowProps> = ({ basePath = '/sdg' }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
      <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(17, minmax(0, 1fr))' }}>
        {SDGS.map((sdg) => (
          <NavLink
            key={sdg.id}
            to={`${basePath}/${sdg.id}`}
            title={`Goal ${sdg.id}: ${sdg.name}`}
            className={({ isActive }) =>
              cn(
                'group relative aspect-square min-w-0 overflow-hidden rounded-md border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40',
                isActive
                  ? 'border-orange-300 ring-2 ring-orange-200'
                  : 'border-gray-100 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-sm'
              )
            }
          >
            <img
              src={sdg.image}
              alt={sdg.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};