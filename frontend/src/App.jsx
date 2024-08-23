import { useEffect, useState } from "react";
import useUsernameHook from "./hooks/usernameHook";
import SendMessage from "./components/sendMessage";
import DisplayMessages from "./components/displayMessages";
import useSocketHook from "./hooks/socketHook";
import NewChat from "./components/newChat";
import useChatIdHook from "./hooks/chatIdHook";
import useAuthHook from "./hooks/authHook";
import Login from "./components/login";
import SetPrivate from "./components/setChatPrivacy";
import "./App.css";
import useGetAllMessagesHook from "./hooks/getAllMessagesHook";
import useGetAllChatsHook from "./hooks/getAllChatsHook";


//TODO: user can copy chatID with a button to clipboard maybe
//TODO: user can change senderName and getting saved in the localStorage too

function App() {
  const [messages, setMessages] = useState([]);
  const sender = useUsernameHook();
  const [chats, setChats] = useState([]);
  const chatID = useChatIdHook();
  const socket = useSocketHook({ chatID });
  useGetAllChatsHook({ socket, setChats });
  useGetAllMessagesHook({ socket, chatID, setMessages });
  const { isLoggedIn } = useAuthHook({ socket });

  console.log("user log in", isLoggedIn);

  // const getMessages = async () => {

  //   socket.emit('getMessages', {chatID})
  //   socket.on('getMessages', async (data)=>{
  //     console.log(data);
  //   })

  // };

  useEffect(() => {
    if (socket != null) {
      socket.on("message", (newMessage) => {
        setMessages([...messages, newMessage]);
      });
      console.log();
    }
  }, [socket, messages, setMessages]);
  return (
    <div className="App">
      {isLoggedIn && (
        <div className="grid grid-cols-2">
          <div className=" flex flex-col  ">

            <div className=" flex justify-center max-h-[100px] ">
              <NewChat socket={socket} />

              <SetPrivate socket={socket} chatID={chatID} />
            </div>
            <div className=" flex flex-col ">
                {chats.map((chat) => (
                  <div key={chat.name}  className="border-2   border-black">
                    <a href={`/?chatID=${chat.name}`}>
                    <p>{chat.name =='null'? 'General Chat': chat.name}</p>
                    </a>
                  </div>
                ))}
            </div>
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
