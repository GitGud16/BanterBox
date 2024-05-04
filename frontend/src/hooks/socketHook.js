import { useEffect, useState } from "react";
import {io} from "socket.io-client";

function useSocketHook({chatID, isLoggedIn}) {


    const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('/',{query:{chatID,isLoggedIn}}))
  },[])

  return socket
}
export default useSocketHook