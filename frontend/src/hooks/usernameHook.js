import  { useEffect, useState } from "react";

export default function useUsernameHook(){
    const [sender, setSender] = useState("Guest");

    useEffect(() => {
        const senderName = prompt("Enter your name", "Guest");
        setSender(senderName);
      }, []);

      return sender;
}