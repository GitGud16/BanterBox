import { useState, useEffect } from "react";

function Login({ socket }) {
  const [email, setEmail] = useState("");
  let userEmail
  console.log("login detected", email);
  const onLoginButtonClick = () => {
      userEmail = document.getElementById('email').value
      if(!userEmail || !userEmail.length > 0)return
       setEmail(userEmail)
      console.log('userEmail1: ',userEmail);
      socket.emit("login", { email:userEmail });
  };

  useEffect(()=>{
    console.log('useEffect: ',email);
    if(!socket)return
        console.log('hi socket: ',socket);
        socket.on("otpsent", () => {
            const otp = prompt('enter your otp:')
            console.log("otp: ",otp);
            console.log('email: ', userEmail);
          socket.emit('otpVerification',{otp,email:userEmail})  
        });
        socket.on('otpSuccess',(data)=>{
          console.log(data.token);
          window.localStorage.setItem('token',data.token)
        })

        socket.on('otpFailed',()=>{
          console.log('JWT failed honey');
        })
  },[socket])

  return (
    <>
      <h1 className="ml-2">LogIn</h1>
      <div className="mx-auto">
        Email:{" "}
        <input
          id="email"
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
