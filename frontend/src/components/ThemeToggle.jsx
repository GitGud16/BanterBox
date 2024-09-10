import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-orange-600 text-gray-100' : 'bg-orange-400 text-gray-900'}`}
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeToggle;