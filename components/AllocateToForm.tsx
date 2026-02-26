'use client';

import { useState } from 'react';
import { Users, X } from 'lucide-react';
import { Room } from '@/app/types';
import { allocateRoomToStudents } from '@/utils/storage';

interface AllocateToFormProps {
  room: Room | null;
  onAllocationComplete: (room: Room, success: boolean) => void;
  onError: (message: string) => void;
  onClose: () => void;
}

export const AllocateToForm: React.FC<AllocateToFormProps> = ({
  room,
  onAllocationComplete,
  onError,
  onClose,
}) => {
  const [studentNames, setStudentNames] = useState('');
  const [isAllocating, setIsAllocating] = useState(false);

  if (!room) return null;

  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAllocating(true);

    if (!studentNames.trim()) {
      onError('Please enter student name(s)');
      setIsAllocating(false);
      return;
    }

    const updatedRoom = allocateRoomToStudents(room.id, studentNames.trim());
    
    if (updatedRoom) {
      onAllocationComplete(updatedRoom, true);
      setStudentNames('');
      onClose();
    } else {
      onError('Failed to allocate room');
    }
    
    setIsAllocating(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700 animate-slide-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Allocate Room {room.roomNo}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleAllocate} className="space-y-4">
          {/* Room Details */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Room</span>
              <span className="font-semibold text-gray-800 dark:text-white">{room.roomNo}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Capacity</span>
              <span className="font-semibold text-gray-800 dark:text-white">{room.capacity} people</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                room.hasAC 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'bg-gray-100 dark:bg-gray-600 text-gray-400'
              }`}>
                {room.hasAC ? 'AC' : 'No AC'}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                room.hasAttachedWashroom 
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                  : 'bg-gray-100 dark:bg-gray-600 text-gray-400'
              }`}>
                {room.hasAttachedWashroom ? 'Washroom' : 'No Washroom'}
              </span>
            </div>
          </div>

          {/* Student Names Input */}
          <div>
            <label
              htmlFor="studentNames"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Student Name(s) <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="studentNames"
              value={studentNames}
              onChange={(e) => setStudentNames(e.target.value)}
              placeholder="Enter student names (comma separated)"
              rows={3}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all resize-none"
              disabled={isAllocating}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Example: John Doe, Jane Smith
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAllocating}
              className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAllocating ? 'Allocating...' : 'Confirm Allocation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
