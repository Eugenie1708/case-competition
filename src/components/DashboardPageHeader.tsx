import React from 'react';
import { Search, User } from 'lucide-react';
import { SDGIconRow } from './SDGIconRow';

interface DashboardPageHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  filterButton?: React.ReactNode;
  sdgBasePath?: string;
  sdgHelperText?: string;
  sdgBusinessTooltipTopicsBySdg?: Partial<Record<number, string[]>>;
}

export const DashboardPageHeader: React.FC<DashboardPageHeaderProps> = ({
  title,
  subtitle,
  actions,
  filterButton,
  sdgBasePath = '/sdg',
  sdgHelperText,
  sdgBusinessTooltipTopicsBySdg,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-serif font-medium text-gray-900">{title}</h2>
          <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3 self-start shrink-0">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search publications, faculty..."
              className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          {filterButton}

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>

      {actions ? <div className="flex flex-wrap items-center justify-end gap-3">{actions}</div> : null}

      <SDGIconRow basePath={sdgBasePath} businessTooltipTopicsBySdg={sdgBusinessTooltipTopicsBySdg} />

      {sdgHelperText ? <p className="text-xs text-gray-500">{sdgHelperText}</p> : null}
    </div>
  );
};