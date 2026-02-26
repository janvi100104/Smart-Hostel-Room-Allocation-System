'use client';

import { useState } from 'react';
import { Users, Wind, Droplet, ArrowRight } from 'lucide-react';
import { Room, AllocationResult } from '@/app/types';
import { getRooms } from '@/utils/storage';

interface AllocationFormProps {
  onAllocationComplete: (result: AllocationResult) => void;
  onError: (message: string) => void;
}

export const AllocationForm: React.FC<AllocationFormProps> = ({
  onAllocationComplete,
  onError,
}) => {
  const [studentCount, setStudentCount] = useState('');
  const [needAC, setNeedAC] = useState(false);
  const [needWashroom, setNeedWashroom] = useState(false);
  const [isAllocating, setIsAllocating] = useState(false);

  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAllocating(true);

    // Validation
    if (!studentCount || parseInt(studentCount) <= 0) {
      onError('Please enter a valid number of students');
      setIsAllocating(false);
      return;
    }

    const studentsNeeded = parseInt(studentCount);

    // Get all rooms
    const allRooms = getRooms();

    if (allRooms.length === 0) {
      onAllocationComplete({
        room: null,
        message: 'No rooms available in the system',
        isSuccess: false,
      });
      setIsAllocating(false);
      return;
    }

    // Filter rooms based on requirements
    let filteredRooms = allRooms.filter((room) => {
      // Check capacity
      if (room.capacity < studentsNeeded) return false;

      // Check AC requirement
      if (needAC && !room.hasAC) return false;

      // Check Washroom requirement
      if (needWashroom && !room.hasAttachedWashroom) return false;

      return true;
    });

    // Sort by capacity (ascending) - smallest suitable room first
    filteredRooms.sort((a, b) => {
      // Primary sort: capacity ascending
      if (a.capacity !== b.capacity) {
        return a.capacity - b.capacity;
      }

      // Secondary sort: fewer features first (prefer simpler rooms)
      const aFeatures = (a.hasAC ? 1 : 0) + (a.hasAttachedWashroom ? 1 : 0);
      const bFeatures = (b.hasAC ? 1 : 0) + (b.hasAttachedWashroom ? 1 : 0);
      return aFeatures - bFeatures;
    });

    // Select the first room (best match)
    if (filteredRooms.length > 0) {
      const selectedRoom = filteredRooms[0];
      onAllocationComplete({
        room: selectedRoom,
        message: `Successfully allocated Room ${selectedRoom.roomNo}`,
        isSuccess: true,
      });
    } else {
      onAllocationComplete({
        room: null,
        message: `No room found matching your requirements (${studentsNeeded} students${needAC ? ', AC' : ''}${needWashroom ? ', Washroom' : ''})`,
        isSuccess: false,
      });
    }

    setIsAllocating(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
          <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Allocate Room
        </h2>
      </div>

      <form onSubmit={handleAllocate} className="space-y-5">
        {/* Number of Students */}
        <div>
          <label
            htmlFor="studentCount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Number of Students
          </label>
          <input
            type="number"
            id="studentCount"
            value={studentCount}
            onChange={(e) => setStudentCount(e.target.value)}
            placeholder="e.g., 2"
            min="1"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            disabled={isAllocating}
          />
        </div>

        {/* Preferences */}
        <div className="flex gap-4">
          <label className="flex-1 flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <input
              type="checkbox"
              checked={needAC}
              onChange={(e) => setNeedAC(e.target.checked)}
              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              disabled={isAllocating}
            />
            <Wind className={`w-5 h-5 ${needAC ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Need AC
            </span>
          </label>

          <label className="flex-1 flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <input
              type="checkbox"
              checked={needWashroom}
              onChange={(e) => setNeedWashroom(e.target.checked)}
              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              disabled={isAllocating}
            />
            <Droplet className={`w-5 h-5 ${needWashroom ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Need Washroom
            </span>
          </label>
        </div>

        {/* Allocate Button */}
        <button
          type="submit"
          disabled={isAllocating}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAllocating ? (
            <>
              <span className="animate-spin">⏳</span>
              Finding Room...
            </>
          ) : (
            <>
              Allocate Room
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
