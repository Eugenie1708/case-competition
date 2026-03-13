import React from 'react';
import { cn } from '../lib/utils';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, trend, trendDirection, icon, className, valueClassName }) => {
  return (
    <div className={cn("bg-white p-6 rounded-xl border border-gray-200 shadow-sm", className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="flex items-end gap-3">
        <span className={cn("text-3xl font-semibold text-gray-900", valueClassName)} title={typeof value === 'string' ? value : undefined}>{value}</span>
        {trend && (
          <div className={cn(
            "flex items-center text-xs font-medium px-1.5 py-0.5 rounded mb-1",
            trendDirection === 'up' ? "text-emerald-700 bg-emerald-50" :
            trendDirection === 'down' ? "text-red-700 bg-red-50" :
            "text-gray-600 bg-gray-100"
          )}>
            {trendDirection === 'up' && <ArrowUpRight className="w-3 h-3 mr-1" />}
            {trendDirection === 'down' && <ArrowDownRight className="w-3 h-3 mr-1" />}
            {trendDirection === 'neutral' && <Minus className="w-3 h-3 mr-1" />}
            {trend}
          </div>
        )}
      </div>
    </div>
  );
};
