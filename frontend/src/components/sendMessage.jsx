import { useState, useContext } from "react";
import ThemeContext from '../contexts/ThemeContext';

function SendMessage({ sender, messages, setMessages, socket, chatID }) {
  const [messageInput, setMessageInput] = useState("");
  const { theme } = useContext(ThemeContext);

  const sendMessage = () => {
    if (messageInput && messageInput.length > 0) {
      const newMessage = {
        // id: messages.length + 1,
        text: messageInput,
        // time: new Date().getTime(),
        chatID,
        sender,
      };
      const token = window.localStorage.getItem("token");
      console.log('before emit');
      const emitValue= socket.emit('message', {message:newMessage, token});
      console.log('after emit', emitValue);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput("");
    }
  }

  const handleKeyDown = (e) => {
    console.log('hi');
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className={`p-4 border-t border-gray-700 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
      <div className="flex">
        <textarea
          id="new-message"
          className={`flex-grow border rounded-l-lg p-2 resize-none ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows="2"
        />
        <button
          id="send-message"
          className="bg-orange-600 text-white px-4 rounded-r-lg hover:bg-orange-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default SendMessage;
