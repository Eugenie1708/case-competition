import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 border-l border-gray-200 flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Filters</h3>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year Range</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="2020" className="w-full p-2 border border-gray-200 rounded-lg text-sm" />
                  <span className="self-center text-gray-400">-</span>
                  <input type="number" placeholder="2025" className="w-full p-2 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <div className="space-y-2">
                  {['Business Administration', 'Finance', 'Accountancy', 'Information Systems'].map(dept => (
                    <label key={dept} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                      <span className="text-sm text-gray-600">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sustainability Focus</label>
                <div className="space-y-2">
                  {['Climate & Carbon', 'Supply Chain', 'Social Impact', 'Governance'].map(theme => (
                    <label key={theme} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                      <span className="text-sm text-gray-600">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button className="w-full py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
