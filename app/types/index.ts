// Room interface representing a hostel room
export interface Room {
  id: string;
  roomNo: string;
  capacity: number;
  hasAC: boolean;
  hasAttachedWashroom: boolean;
  createdAt: number;
  allocatedTo?: string; // Names of students allocated to this room (comma-separated)
  isAllocated: boolean; // Whether the room is currently allocated
}

// Filter state interface
export interface FilterState {
  minCapacity: string;
  acPreference: 'any' | 'yes' | 'no';
  washroomPreference: 'any' | 'yes' | 'no';
  allocationStatus: 'all' | 'allocated' | 'unallocated';
}

// Toast notification types
export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

// Allocation result interface
export interface AllocationResult {
  room: Room | null;
  message: string;
  isSuccess: boolean;
}

// Sample data for seeding
export const sampleRooms: Omit<Room, 'id' | 'createdAt'>[] = [
  { roomNo: '101', capacity: 2, hasAC: true, hasAttachedWashroom: true, isAllocated: false },
  { roomNo: '102', capacity: 3, hasAC: false, hasAttachedWashroom: false, isAllocated: false },
  { roomNo: '103', capacity: 4, hasAC: true, hasAttachedWashroom: false, isAllocated: false },
  { roomNo: '104', capacity: 2, hasAC: false, hasAttachedWashroom: true, isAllocated: false },
  { roomNo: '105', capacity: 5, hasAC: true, hasAttachedWashroom: true, isAllocated: false },
  { roomNo: '106', capacity: 3, hasAC: true, hasAttachedWashroom: false, isAllocated: false },
];
