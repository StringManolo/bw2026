import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check saved preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = isDark ? darkTheme : lightTheme;

  return { isDark, toggleTheme, theme };
};

const lightTheme = {
  bg: '#fffefe',
  text: '#333',  // Changed from #443 for better contrast (7.5:1 ratio)
  textSecondary: '#555',
  textTertiary: '#888',
  border: '#e5e5e5',
  borderDark: '#000',
  accent: '#ff7f50',
  card: '#f9f9f9',
  hover: 'rgba(0,0,0,0.05)',
  // Additional colors for markdown
  link: '#0366d6',
  codeBg: '#f5f5f5',
  codeText: '#c7254e',
  isDark: false
};

const darkTheme = {
  bg: '#0f0f0f',
  text: '#e5e5e5',
  textSecondary: '#b0b0b0',
  textTertiary: '#808080',
  border: '#2a2a2a',
  borderDark: '#e5e5e5',
  accent: '#ff7f50',
  card: '#1a1a1a',
  hover: 'rgba(255,255,255,0.05)',
  // Additional colors for markdown
  link: '#58a6ff',
  codeBg: '#1e1e1e',
  codeText: '#e06c75',
  isDark: true
};
