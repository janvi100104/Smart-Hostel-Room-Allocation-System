'use client';

import { Sun, Moon, Database } from 'lucide-react';

interface HeaderProps {
  onToggleTheme: () => void;
  isDark: boolean;
  onSeedData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleTheme,
  isDark,
  onSeedData,
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Hostel Room Allocation
              </h1>
              <p className="text-blue-100 text-sm hidden sm:block">
                Smart Room Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSeedData}
              className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 text-sm font-medium"
              title="Load Sample Data"
            >
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Load Sample Data</span>
            </button>

            <button
              onClick={onToggleTheme}
              className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
