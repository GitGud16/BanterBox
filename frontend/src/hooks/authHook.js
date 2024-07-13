import { useEffect, useState } from "react"


const useAuthHook = ({socket}) => {
const [token, setToken] = useState(window.localStorage.getItem('token'))
    


useEffect(() => {

if(!socket)return

    socket.on('otpSuccess',(data)=>{
        console.log(data.token);
        window.localStorage.setItem('token',data.token)
        setToken( data.token)
      })

},[socket])
return {
    isLoggedIn: token ? true : false,
    token
}
}

export default useAuthHook