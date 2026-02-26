'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { AddRoomForm } from '@/components/AddRoomForm';
import { RoomList } from '@/components/RoomList';
import { FilterPanel } from '@/components/FilterPanel';
import { AllocationForm } from '@/components/AllocationForm';
import { AllocationResult } from '@/components/AllocationResult';
import { ToastContainer } from '@/components/Toast';
import { useTheme } from '@/hooks/useTheme';
import { Room, FilterState, ToastMessage, ToastType, AllocationResult as AllocationResultType, sampleRooms } from '@/app/types';
import { getRooms, addRoom, deleteRoom, isRoomNumberTaken, generateId } from '@/utils/storage';

export default function Home() {
  const { theme, toggleTheme, isMounted } = useTheme();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    minCapacity: '',
    acPreference: 'any',
    washroomPreference: 'any',
  });
  const [allocationResult, setAllocationResult] = useState<AllocationResultType | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load rooms on mount
  useEffect(() => {
    setRooms(getRooms());
  }, []);

  // Toast helper functions
  const addToast = (type: ToastType, message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Room handlers
  const handleRoomAdded = (room: Room) => {
    setRooms((prev) => [...prev, room]);
    addToast('success', `Room ${room.roomNo} added successfully!`);
  };

  const handleDeleteRoom = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    deleteRoom(roomId);
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
    addToast('info', `Room ${room?.roomNo} deleted`);
  };

  // Filter handlers
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Allocation handler
  const handleAllocationComplete = (result: AllocationResultType) => {
    setAllocationResult(result);
    if (result.isSuccess) {
      addToast('success', result.message);
    } else {
      addToast('error', result.message);
    }
  };

  // Seed data handler
  const handleSeedData = () => {
    const existingRooms = getRooms();
    if (existingRooms.length > 0) {
      addToast('info', 'Data already exists. Clear rooms first to load sample data.');
      return;
    }

    // Add sample rooms
    sampleRooms.forEach((roomData) => {
      if (!isRoomNumberTaken(roomData.roomNo)) {
        addRoom({
          roomNo: roomData.roomNo,
          capacity: roomData.capacity,
          hasAC: roomData.hasAC,
          hasAttachedWashroom: roomData.hasAttachedWashroom,
        });
      }
    });

    setRooms(getRooms());
    addToast('success', 'Sample data loaded successfully!');
  };

  // Filter rooms based on criteria
  const filteredRooms = rooms.filter((room) => {
    // Minimum capacity filter
    if (filters.minCapacity && room.capacity < parseInt(filters.minCapacity)) {
      return false;
    }

    // AC preference filter
    if (filters.acPreference === 'yes' && !room.hasAC) {
      return false;
    }
    if (filters.acPreference === 'no' && room.hasAC) {
      return false;
    }

    // Washroom preference filter
    if (filters.washroomPreference === 'yes' && !room.hasAttachedWashroom) {
      return false;
    }
    if (filters.washroomPreference === 'no' && room.hasAttachedWashroom) {
      return false;
    }

    return true;
  });

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Header */}
      <Header
        onToggleTheme={toggleTheme}
        isDark={theme === 'dark'}
        onSeedData={handleSeedData}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-1 space-y-6">
            <AddRoomForm
              onRoomAdded={handleRoomAdded}
              onError={(msg) => addToast('error', msg)}
            />
            
            <AllocationForm
              onAllocationComplete={handleAllocationComplete}
              onError={(msg) => addToast('error', msg)}
            />

            <AllocationResult result={allocationResult} />
          </div>

          {/* Right Column - Room List & Filters */}
          <div className="lg:col-span-2 space-y-6">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              totalRooms={rooms.length}
              filteredCount={filteredRooms.length}
            />

            <RoomList
              rooms={filteredRooms}
              onDelete={handleDeleteRoom}
              showDelete={true}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Smart Hostel Room Allocation System &copy; {new Date().getFullYear()}</p>
          <p className="mt-1">Built with Next.js, TypeScript & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
