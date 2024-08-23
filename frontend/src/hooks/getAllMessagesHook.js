import { useEffect } from "react";


export default function useGetAllMessagesHook({socket, chatID, setMessages}) {

    useEffect(() => {
        if(socket == null) return
        const token = localStorage.getItem('token')
        socket.on('getMessages', async (messages)=>{
            setMessages(messages)
        })
        socket.emit('getMessages', {chatID, token})
    },[socket])
}