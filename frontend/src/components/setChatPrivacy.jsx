import { useEffect, useState, useContext } from "react";
import PrivateIcon from "../assets/unlock.svg";
import PublicIcon from "../assets/noun-lock-158242.svg";
import ThemeContext from '../contexts/ThemeContext';
import Modal from './Modal';

export default function SetPrivate({ chatID, socket }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

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

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
    setInviteEmail('');
  };

  const handleInvite = () => {
    const token = window.localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    
    if (!validateEmail(inviteEmail)) {
      alert("Invalid email address");
      return;
    }
    
    socket.emit("invite", { chatID, token, invitedUserEmail: inviteEmail });
    closeInviteModal();
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const buttonClass = `px-2 py-1 text-sm md:px-3 md:py-1 md:text-base rounded transition duration-300 ${
    theme === 'dark'
      ? 'bg-orange-600 text-gray-100 hover:bg-orange-700'
      : 'bg-orange-400 text-gray-900 hover:bg-orange-500'
  }`;

  return (
    <>
      <div className="flex items-center space-x-1 md:space-x-2">
        <button className={buttonClass} onClick={() => setChatPrivacy(1)}>
          Private
        </button>
        <button className={buttonClass} onClick={openInviteModal}>
          Invite
        </button>
        <button className={buttonClass} onClick={() => setChatPrivacy(0)}>
          Public
        </button>
        <img
          className="w-4 h-4 md:w-6 md:h-6"
          src={isPrivate ? PrivateIcon : PublicIcon}
          alt={isPrivate ? "Private" : "Public"}
        />
      </div>
      <Modal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        onConfirm={handleInvite}
        title="Invite User"
      >
        <input
          type="email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder="Enter user email"
          className={`w-full p-2 rounded ${
            theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
          }`}
        />
      </Modal>
    </>
  );
}