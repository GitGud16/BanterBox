import { useEffect } from "react";

export default function useGetAllChatsHook({socket, setChats}) {
    useEffect(() => {
        if(socket == null) return
        const token = localStorage.getItem('token')     
        socket.on('getAllChats', async (chats)=> {
            console.log('chats: ',chats);
            setChats(chats)
        })
        socket.emit('getAllChats', {token})
    },[socket])

}