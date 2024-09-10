import React, { useContext, useRef, useEffect } from 'react';
import ThemeContext from '../contexts/ThemeContext';

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  const { theme } = useContext(ThemeContext);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
      <div 
        ref={modalRef} 
        className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg p-6 w-full max-w-md animate-scale-in`}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-4">
          {children}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;