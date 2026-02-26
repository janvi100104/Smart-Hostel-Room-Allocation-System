'use client';

import { Wind, Droplet, Trash2 } from 'lucide-react';
import { Room } from '@/app/types';

interface RoomCardProps {
  room: Room;
  onDelete?: (id: string) => void;
  showDelete?: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onDelete,
  showDelete = false,
}) => {
  const getStatus = () => {
    if (room.capacity <= 0) {
      return { label: 'Full', color: 'bg-red-500', textColor: 'text-red-600 dark:text-red-400' };
    }
    return { label: 'Available', color: 'bg-green-500', textColor: 'text-green-600 dark:text-green-400' };
  };

  const status = getStatus();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Room {room.roomNo}
            </span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${status.color}`}>
            {status.label}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="space-y-3">
          {/* Capacity */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Capacity</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${
              room.hasAC 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            }`}>
              <Wind className="w-4 h-4" />
              <span className="text-xs font-medium">
                {room.hasAC ? 'AC' : 'No AC'}
              </span>
            </div>

            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${
              room.hasAttachedWashroom 
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            }`}>
              <Droplet className="w-4 h-4" />
              <span className="text-xs font-medium">
                {room.hasAttachedWashroom ? 'Washroom' : 'No Washroom'}
              </span>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        {showDelete && onDelete && (
          <button
            onClick={() => onDelete(room.id)}
            className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
            Delete Room
          </button>
        )}
      </div>
    </div>
  );
};
