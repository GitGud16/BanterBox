import { useState, useEffect, useContext } from "react";
import ThemeContext from '../contexts/ThemeContext';
import Modal from './Modal';

function Login({ socket }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  



  const onLoginButtonClick = () => {
    if (!email || email.length === 0) return;
    socket.emit("login", { email });
  };

  
  const handleOtpSubmit = () => {
    socket.emit('otpVerification', { otp, email });
    setIsOtpModalOpen(false);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("otpsent", () => {
      setIsOtpModalOpen(true);
    });

    socket.on('otpFailed', () => {
      console.log('JWT failed honey');
    });

    return () => {
      socket.off("otpsent");
      socket.off("otpFailed");
    };
  }, [socket]);

  return (
    <div className="w-full max-w-xs">
      <form className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="mb-4 text-xl font-bold">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
              theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'
            }`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <button
            onClick={onLoginButtonClick}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            Login
          </button>
        </div>
      </form>
      <Modal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onConfirm={handleOtpSubmit}
        title="OTP Verification"
      >
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className={`w-full p-2 rounded ${
            theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
          }`}
        />
      </Modal>
    </div>
  );
}

export default Login;
