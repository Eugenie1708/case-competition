import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { Publication } from '../data/publications';

interface ResourceCardProps {
  publication: Publication;
  type?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ publication, type = "Brief" }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-orange-200 transition-colors group cursor-pointer h-full flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] uppercase font-bold tracking-wider rounded">{type}</span>
        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
      </div>
      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-700 transition-colors flex-1">
        {publication.title}
      </h4>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
        {publication.abstract}
      </p>
      <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
        <FileText className="w-3 h-3" />
        <span>Source: {publication.journal_title}</span>
      </div>
    </div>
  );
};
