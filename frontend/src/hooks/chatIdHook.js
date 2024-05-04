import { useEffect, useState } from "react";


const useChatIdHook = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const getChatID = urlParams.get("chatID");
    const [chatID, setChatID] = useState(getChatID);

    return chatID
}

export default useChatIdHook
