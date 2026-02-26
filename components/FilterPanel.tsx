'use client';

import { Filter, RotateCcw } from 'lucide-react';
import { FilterState } from '@/app/types';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalRooms: number;
  filteredCount: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  totalRooms,
  filteredCount,
}) => {
  const handleReset = () => {
    onFiltersChange({
      minCapacity: '',
      acPreference: 'any',
      washroomPreference: 'any',
      allocationStatus: 'all',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
            <Filter className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Search & Filter
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-purple-600 dark:text-purple-400">{filteredCount}</span> of{' '}
            <span className="font-semibold text-gray-600 dark:text-gray-400">{totalRooms}</span> rooms
          </span>
          <button
            onClick={handleReset}
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Minimum Capacity */}
        <div>
          <label
            htmlFor="minCapacity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Minimum Capacity
          </label>
          <input
            type="number"
            id="minCapacity"
            value={filters.minCapacity}
            onChange={(e) =>
              onFiltersChange({ ...filters, minCapacity: e.target.value })
            }
            placeholder="e.g., 2"
            min="1"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
          />
        </div>

        {/* AC Preference */}
        <div>
          <label
            htmlFor="acPreference"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Air Conditioning
          </label>
          <select
            id="acPreference"
            value={filters.acPreference}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                acPreference: e.target.value as 'any' | 'yes' | 'no',
              })
            }
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 dark:text-white transition-all"
          >
            <option value="any">Any</option>
            <option value="yes">AC Required</option>
            <option value="no">No AC</option>
          </select>
        </div>

        {/* Washroom Preference */}
        <div>
          <label
            htmlFor="washroomPreference"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Attached Washroom
          </label>
          <select
            id="washroomPreference"
            value={filters.washroomPreference}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                washroomPreference: e.target.value as 'any' | 'yes' | 'no',
              })
            }
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 dark:text-white transition-all"
          >
            <option value="any">Any</option>
            <option value="yes">Washroom Required</option>
            <option value="no">No Washroom</option>
          </select>
        </div>

        {/* Allocation Status */}
        <div>
          <label
            htmlFor="allocationStatus"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Room Status
          </label>
          <select
            id="allocationStatus"
            value={filters.allocationStatus}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                allocationStatus: e.target.value as 'all' | 'allocated' | 'unallocated',
              })
            }
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 dark:text-white transition-all"
          >
            <option value="all">All Rooms</option>
            <option value="allocated">Allocated</option>
            <option value="unallocated">Unallocated</option>
          </select>
        </div>
      </div>
    </div>
  );
};
