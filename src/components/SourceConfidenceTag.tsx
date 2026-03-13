import React from 'react';
import { cn } from '../lib/utils';

interface SourceConfidenceTagProps {
  level: 'High' | 'Medium' | 'Low';
  source?: string;
  className?: string;
}

export const SourceConfidenceTag: React.FC<SourceConfidenceTagProps> = ({ level, source, className }) => {
  const colorMap = {
    High: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Medium: 'bg-amber-100 text-amber-800 border-amber-200',
    Low: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className={cn("inline-flex items-center gap-2 text-xs font-medium", className)}>
      <span className={cn("px-2 py-0.5 rounded-full border", colorMap[level])}>
        {level} Confidence
      </span>
      {source && (
        <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">
          {source}
        </span>
      )}
    </div>
  );
};
