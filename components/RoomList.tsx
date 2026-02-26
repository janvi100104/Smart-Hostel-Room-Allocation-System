'use client';

import { Home } from 'lucide-react';
import { Room } from '@/app/types';
import { RoomCard } from './RoomCard';

interface RoomListProps {
  rooms: Room[];
  onDelete?: (id: string) => void;
  showDelete?: boolean;
}

export const RoomList: React.FC<RoomListProps> = ({
  rooms,
  onDelete,
  showDelete = false,
}) => {
  if (rooms.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 border border-gray-100 dark:border-gray-700 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
          <Home className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          No Rooms Available
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          There are no rooms to display. Add a new room to get started with the allocation system.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onDelete={onDelete}
          showDelete={showDelete}
        />
      ))}
    </div>
  );
};
