import { useContext, useEffect, useRef } from 'react';
import ThemeContext from '../contexts/ThemeContext';

function DisplayMessages({ messages }) {
  const { theme } = useContext(ThemeContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="p-4 space-y-4">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} animate-fade-in`}
        >
          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            message.sender === 'You'
              ? 'bg-orange-600 text-gray-100'
              : theme === 'dark'
              ? 'bg-gray-700 text-gray-100'
              : 'bg-gray-300 text-gray-900'
          }`}>
            <p className="font-bold">{message.sender}</p>
            <p>{message.text}</p>
            <p className="text-xs mt-1 text-right">
              {new Date(message.time).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default DisplayMessages;