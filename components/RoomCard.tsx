'use client';

import { Wind, Droplet, Trash2, Users, CheckCircle, XCircle } from 'lucide-react';
import { Room } from '@/app/types';

interface RoomCardProps {
  room: Room;
  onDelete?: (id: string) => void;
  onDeallocate?: (id: string) => void;
  showDelete?: boolean;
  showDeallocate?: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onDelete,
  onDeallocate,
  showDelete = false,
  showDeallocate = false,
}) => {
  const getStatus = () => {
    if (room.isAllocated) {
      return { 
        label: 'Allocated', 
        color: 'bg-red-500', 
        textColor: 'text-red-600 dark:text-red-400',
        icon: <XCircle className="w-4 h-4" />
      };
    }
    if (room.capacity <= 0) {
      return { 
        label: 'Full', 
        color: 'bg-orange-500', 
        textColor: 'text-orange-600 dark:text-orange-400',
        icon: <Users className="w-4 h-4" />
      };
    }
    return { 
      label: 'Available', 
      color: 'bg-green-500', 
      textColor: 'text-green-600 dark:text-green-400',
      icon: <CheckCircle className="w-4 h-4" />
    };
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
          <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1 ${status.color}`}>
            {status.icon}
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

          {/* Allocated To */}
          {room.isAllocated && room.allocatedTo && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-100 dark:border-red-800">
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-red-700 dark:text-red-300">Allocated to:</p>
                  <p className="text-sm text-red-800 dark:text-red-200">{room.allocatedTo}</p>
                </div>
              </div>
            </div>
          )}

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

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          {showDeallocate && onDeallocate && room.isAllocated && (
            <button
              onClick={() => onDeallocate(room.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors text-sm font-medium"
            >
              Deallocate
            </button>
          )}
          
          {showDelete && onDelete && (
            <button
              onClick={() => onDelete(room.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
