import  { useState } from "react";
function SendMessage({ sender, messages, setMessages }) {
  const [messageInput, setMessageInput] = useState("");

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
  }



  const handleKeyDown = (e) => {
    console.log('hi');
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <div className="mt-10 grid grid-cols-2 bottom-0 absolute inset-x-0 mx-10 mb-2">
        <textarea
          id="new-message"
          className="border-2 border-black"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          id="send-message"
          className="border-2 border-black max-w-full justify-self-end"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </>
  );
}
export default SendMessage;
