'use client';

import { useState } from 'react';
import { Plus, Wind, Droplet } from 'lucide-react';
import { Room } from '@/app/types';
import { isRoomNumberTaken, addRoom } from '@/utils/storage';

interface AddRoomFormProps {
  onRoomAdded: (room: Room) => void;
  onError: (message: string) => void;
}

export const AddRoomForm: React.FC<AddRoomFormProps> = ({
  onRoomAdded,
  onError,
}) => {
  const [roomNo, setRoomNo] = useState('');
  const [capacity, setCapacity] = useState('');
  const [hasAC, setHasAC] = useState(false);
  const [hasAttachedWashroom, setHasAttachedWashroom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!roomNo.trim()) {
      onError('Room number is required');
      setIsSubmitting(false);
      return;
    }

    if (!capacity || parseInt(capacity) <= 0) {
      onError('Capacity must be a positive number');
      setIsSubmitting(false);
      return;
    }

    if (isRoomNumberTaken(roomNo.trim())) {
      onError(`Room ${roomNo.trim()} already exists`);
      setIsSubmitting(false);
      return;
    }

    // Create room
    const newRoom = addRoom({
      roomNo: roomNo.trim(),
      capacity: parseInt(capacity),
      hasAC,
      hasAttachedWashroom,
    });

    onRoomAdded(newRoom);

    // Reset form
    setRoomNo('');
    setCapacity('');
    setHasAC(false);
    setHasAttachedWashroom(false);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
          <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Add New Room
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Room Number */}
        <div>
          <label
            htmlFor="roomNo"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Room Number
          </label>
          <input
            type="text"
            id="roomNo"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            placeholder="e.g., 101"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            disabled={isSubmitting}
          />
        </div>

        {/* Capacity */}
        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="e.g., 3"
            min="1"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            disabled={isSubmitting}
          />
        </div>

        {/* Features */}
        <div className="flex gap-4">
          <label className="flex-1 flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <input
              type="checkbox"
              checked={hasAC}
              onChange={(e) => setHasAC(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <Wind className={`w-5 h-5 ${hasAC ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Air Conditioned
            </span>
          </label>

          <label className="flex-1 flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <input
              type="checkbox"
              checked={hasAttachedWashroom}
              onChange={(e) => setHasAttachedWashroom(e.target.checked)}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              disabled={isSubmitting}
            />
            <Droplet className={`w-5 h-5 ${hasAttachedWashroom ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Attached Washroom
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {isSubmitting ? 'Adding...' : 'Add Room'}
        </button>
      </form>
    </div>
  );
};
