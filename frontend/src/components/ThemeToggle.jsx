import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`px-3 py-1 rounded transition duration-300 ${theme === 'dark' ? 'bg-orange-600 text-gray-100 hover:bg-orange-700' : 'bg-orange-400 text-gray-900 hover:bg-orange-500'}`}
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeToggle;