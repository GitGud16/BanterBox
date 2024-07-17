import { useEffect, useState } from "react";
import useUsernameHook from "./hooks/usernameHook";
import SendMessage from "./components/sendMessage";
import DisplayMessages from "./components/displayMessages";
import useSocketHook from "./hooks/socketHook";
import NewChat from "./components/newChat";
import useChatIdHook from "./hooks/chatIdHook";
import useAuthHook from "./hooks/authHook";
import Login from "./components/login";
import "./App.css";

//TODO: user can copy chatID with a button to clipboard maybe
//TODO: user can change senderName and getting saved in the localStorage too

function App() {
  const [messages, setMessages] = useState([]);
  const sender = useUsernameHook();

  const chatID = useChatIdHook();
  const socket = useSocketHook({ chatID });
  const { isLoggedIn } = useAuthHook({ socket });

  console.log("user log in", isLoggedIn);
  useEffect(() => {
    if (socket != null) {
      socket.on("message", (newMessage) => {
        setMessages([...messages, newMessage]);
      });
      console.log();
    }
  }, [socket, messages, setMessages]);


  const setPrivateChat = ()=>{
        
  }


  return (
    <div className="App">
      {isLoggedIn && (
        <div className="grid grid-cols-2">


          <div className="mt-10 border-2">
            <NewChat />
          <button 
          className="border-2 p-[0.35em] rounded-3xl"
          onClick={()=>{console.log('hi');}}
          >
            set Private
          </button>
          </div>

          <div className="mt-10 border-2 border-black max-h-[70vh] overflow-y-auto">
            <DisplayMessages messages={messages} />
          </div>

          <SendMessage
            sender={sender}
            messages={messages}
            setMessages={setMessages}
            socket={socket}
            chatID={chatID}
          />
        </div>
      )}
      {!isLoggedIn && (
        <>
          <div className="flex pt-[20%] flex-col">
            <Login socket={socket} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
