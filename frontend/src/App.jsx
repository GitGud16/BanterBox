import { useState, useEffect } from "react";
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
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

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
  const [theme, setTheme] = useState('dark');
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    if (socket != null) {
      socket.on("message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        if (newMessage.chatID !== chatID) {
          setUnreadCounts((prevCounts) => ({
            ...prevCounts,
            [newMessage.chatID]: (prevCounts[newMessage.chatID] || 0) + 1,
          }));
        }
      });
    }
  }, [socket, chatID]);

  const handleChatClick = (clickedChatID) => {
    setUnreadCounts((prevCounts) => ({
      ...prevCounts,
      [clickedChatID]: 0,
    }));
  };

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
    <ThemeProvider value={{ theme, setTheme }}>
      <div className={`App h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
        {isLoggedIn ? (
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-1/4 flex flex-col border-b md:border-r border-gray-700">
              <div className="p-4 flex justify-between items-center">
                <NewChat socket={socket} />
                <ThemeToggle />
              </div>
              <div className="flex-grow overflow-y-auto">
                {chats.map((chat) => (
                  <a
                    key={chat.name}
                    href={`/?chatID=${chat.name}`}
                    className={`block p-3 ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${
                      unreadCounts[chat.name] > 0 ? 'animate-blink' : ''
                    } relative`}
                    onClick={() => handleChatClick(chat.name)}
                  >
                    <p>{chat.name == 'null' ? 'General Chat' : chat.name}</p>
                    {unreadCounts[chat.name] > 0 && (
                      <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                        {unreadCounts[chat.name]}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
            <div className="w-full md:w-3/4 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <SetPrivate socket={socket} chatID={chatID} />
              </div>
              <div className="flex-grow overflow-y-auto">
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
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <Login socket={socket} />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
