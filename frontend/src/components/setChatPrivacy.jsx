import { useEffect, useState } from "react";
import PrivateIcon from "../assets/unlock.svg";
import PublicIcon from "../assets/noun-lock-158242.svg";

export default function SetPrivate({ chatID, socket }) {
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handlePrivacyChange = (data) => {
        console.log("setprivacy");
      if (chatID !== data.chatID) return;
      setIsPrivate(data.privacy === 1);
    };

    socket.on("setPrivacy", handlePrivacyChange);

    return () => {
      socket.off("setPrivacy", handlePrivacyChange);
    };
  }, [socket, chatID]);

  const setChatPrivacy = (privacy) => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    socket.emit("setChatPrivacy", { chatID, token, privacy });
  };

  const invite = () =>{

    const token = window.localStorage.getItem("token");
    const invitedUserEmail = prompt("Enter user email to invite");

    if (!token) throw new Error("No token found");
    const validatedEmail = validateEmail(invitedUserEmail);
    if (!validatedEmail) throw new Error("Invalid email address");
    socket.emit("invite", { chatID, token, invitedUserEmail });

  }

  const validateEmail= (email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <>
      <button
        className="border-2 mx-1 p-[0.35em] rounded-3xl"
        onClick={() => setChatPrivacy(1)}
      >
        Set Private
      </button>
      <button
        className="border-2 mx-1 p-[0.35em] rounded-3xl"
        onClick={() => invite()}
      >
        Invite
      </button>
      <button
        className="border-2 mx-1 p-[0.35em] rounded-3xl"
        onClick={() => setChatPrivacy(0)}
      >
        Set Public
      </button>
      <img
        className="w-[15%]"
        src={isPrivate ? PrivateIcon : PublicIcon}
        alt={isPrivate ? "Private" : "Public"}
      />
    </>
  );
}