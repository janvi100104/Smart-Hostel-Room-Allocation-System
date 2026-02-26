'use client';

import { CheckCircle, XCircle, Wind, Droplet, Users, UserCheck } from 'lucide-react';
import { AllocationResult as AllocationResultType } from '@/app/types';

interface AllocationResultProps {
  result: AllocationResultType | null;
  onAllocateTo?: (room: AllocationResultType & { room: NonNullable<AllocationResultType['room']> }) => void;
  showAllocateTo?: boolean;
}

export const AllocationResult: React.FC<AllocationResultProps> = ({ 
  result, 
  onAllocateTo,
  showAllocateTo = false 
}) => {
  if (!result) {
    return null;
  }

  const handleAllocateTo = () => {
    if (result.room && onAllocateTo) {
      onAllocateTo({ ...result, room: result.room });
    }
  };

  return (
    <div
      className={`rounded-xl shadow-md p-6 border-2 transition-all duration-300 ${
        result.isSuccess
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            result.isSuccess
              ? 'bg-green-100 dark:bg-green-900/40'
              : 'bg-red-100 dark:bg-red-900/40'
          }`}
        >
          {result.isSuccess ? (
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3
            className={`text-lg font-bold mb-2 ${
              result.isSuccess
                ? 'text-green-800 dark:text-green-300'
                : 'text-red-800 dark:text-red-300'
            }`}
          >
            {result.isSuccess ? 'Room Allocated!' : 'Allocation Failed'}
          </h3>
          <p
            className={`text-sm mb-4 ${
              result.isSuccess
                ? 'text-green-700 dark:text-green-400'
                : 'text-red-700 dark:text-red-400'
            }`}
          >
            {result.message}
          </p>

          {/* Room Details */}
          {result.room && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  Room {result.room.roomNo}
                </span>
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                  Available
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">
                    Capacity: <strong>{result.room.capacity} people</strong>
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                      result.room.hasAC
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    <Wind className="w-3 h-3" />
                    {result.room.hasAC ? 'AC Available' : 'No AC'}
                  </div>

                  <div
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                      result.room.hasAttachedWashroom
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    <Droplet className="w-3 h-3" />
                    {result.room.hasAttachedWashroom
                      ? 'Washroom Available'
                      : 'No Washroom'}
                  </div>
                </div>
              </div>

              {showAllocateTo && onAllocateTo && (!result.room.allocatedTo || result.room.allocatedTo === '') && (
                <button
                  onClick={handleAllocateTo}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Allocate to Student(s)
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
