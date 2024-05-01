import React, { useEffect, useState } from "react";
import useUsernameHook from "./hooks/usernameHook";
import SendMessage from "./components/sendMessage";
import DisplayMessages from "./components/displayMessages";
import {io} from "socket.io-client";
import "./App.css";

function App() {
  const sender = useUsernameHook();
  const [messages, setMessages] = useState([]);

  const socket = io("/");
  return (

    <div className="App">
      <div className="grid grid-cols-1">

        <div className="mt-10 border-2 border-black max-h-[70vh] overflow-y-auto">
          <DisplayMessages messages={messages} />
        </div>

        <SendMessage
          sender={sender}
          messages={messages}
          setMessages={setMessages}
        />
        
      </div>
    </div>
  );
}

export default App;
