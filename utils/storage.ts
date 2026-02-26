import { Room } from '@/app/types';

const ROOMS_STORAGE_KEY = 'hostel_rooms';
const THEME_STORAGE_KEY = 'theme_preference';

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Room storage functions
export const getRooms = (): Room[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(ROOMS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading rooms from localStorage:', error);
    return [];
  }
};

export const saveRooms = (rooms: Room[]): void => {
  try {
    localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(rooms));
  } catch (error) {
    console.error('Error saving rooms to localStorage:', error);
  }
};

export const addRoom = (room: Omit<Room, 'id' | 'createdAt'>): Room => {
  const newRoom: Room = {
    ...room,
    id: generateId(),
    createdAt: Date.now(),
  };
  const rooms = getRooms();
  rooms.push(newRoom);
  saveRooms(rooms);
  return newRoom;
};

export const deleteRoom = (roomId: string): void => {
  const rooms = getRooms();
  const filteredRooms = rooms.filter((r) => r.id !== roomId);
  saveRooms(filteredRooms);
};

export const updateRoom = (updatedRoom: Room): void => {
  const rooms = getRooms();
  const updatedRooms = rooms.map((r) =>
    r.id === updatedRoom.id ? updatedRoom : r
  );
  saveRooms(updatedRooms);
};

// Allocate room to students
export const allocateRoomToStudents = (roomId: string, studentNames: string): Room | null => {
  const rooms = getRooms();
  const roomIndex = rooms.findIndex((r) => r.id === roomId);
  
  if (roomIndex === -1) return null;
  
  rooms[roomIndex].isAllocated = true;
  rooms[roomIndex].allocatedTo = studentNames;
  saveRooms(rooms);
  return rooms[roomIndex];
};

// Deallocate room
export const deallocateRoom = (roomId: string): Room | null => {
  const rooms = getRooms();
  const roomIndex = rooms.findIndex((r) => r.id === roomId);
  
  if (roomIndex === -1) return null;
  
  rooms[roomIndex].isAllocated = false;
  rooms[roomIndex].allocatedTo = undefined;
  saveRooms(rooms);
  return rooms[roomIndex];
};

// Check if room number already exists
export const isRoomNumberTaken = (roomNo: string, excludeId?: string): boolean => {
  const rooms = getRooms();
  return rooms.some(
    (r) => r.roomNo.toLowerCase() === roomNo.toLowerCase() && r.id !== excludeId
  );
};

// Theme storage functions
export const getTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  } catch (error) {
    console.error('Error reading theme from localStorage:', error);
    return 'light';
  }
};

export const saveTheme = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    // Also apply to document element immediately
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};

// Clear all data
export const clearAllData = (): void => {
  localStorage.removeItem(ROOMS_STORAGE_KEY);
};
