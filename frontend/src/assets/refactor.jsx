import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [sender, setSender] = useState("Guest");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const senderName = prompt("Enter your name", "Guest");
    setSender(senderName);
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  const sendMessage = () => {
    if (messageInput && messageInput.length > 0) {
      const newMessage = {
        id: messages.length + 1,
        text: messageInput,
        time: new Date().getTime(),
        sender,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <div className="App">
      <div className="grid grid-cols-1">
        <div className="mt-10 border-2 border-black max-h-[70vh] overflow-y-auto">
          {messages.map((message) => (
            <div className="flex justify-start mb-4" key={message.id}>
              {message.sender}
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                {message.text}
              </div>
              <div className="text-xs mt-8">
                {new Date(message.time).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 bottom-0 absolute inset-x-0 mx-10 mb-2">
          <textarea
            id="new-message"
            className="border-2 border-black"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            id="send-message"
            className="border-2 border-black max-w-full justify-self-end"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
