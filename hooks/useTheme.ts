'use client';

import { useState, useEffect } from 'react';
import { getTheme, saveTheme } from '@/utils/storage';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = getTheme();
    setTheme(savedTheme);
    
    // Apply theme class to document
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { theme, toggleTheme, isMounted };
};
