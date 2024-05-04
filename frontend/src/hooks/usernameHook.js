import { useEffect, useState } from "react";

export default function useUsernameHook() {
  /**
   * @returns {string}
   */
  const [sender, setSender] = useState("Guest");

  useEffect(() => {

    let senderName = window.localStorage.getItem("senderName");

    if (senderName) {

      setSender(senderName);
      console.log("there is a username in the localStorage", senderName);

    } else {

      console.log("there is no username in the localStorage", senderName);
      
      senderName = prompt("Enter your name", "Guest");
      setSender(senderName);
      window.localStorage.setItem("senderName", senderName);

    }
  }, []);

  return sender;
}
