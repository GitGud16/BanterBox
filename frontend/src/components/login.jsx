import { useState } from "react";

function Login({ socket }) {
  const [email, setEmail] = useState("");

  const onLoginButtonClick = () => {
    console.log("login detected", email);
    if (email && email.length > 0) {
      socket.emit("login", { email });
    }
  };

  return (
    <>
      <h1 className="ml-2">LogIn</h1>
      <div className="mx-auto">
        Email:{" "}
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(email);
          }}
          value={email}
          className="mt-5 mb-5 ml-2  border-2 border-black"
          type="email"
        />
      </div>
      <button onClick={onLoginButtonClick} className="mx-auto w-[10%] border-2">
        LogIn
      </button>
    </>
  );
}

export default Login;
