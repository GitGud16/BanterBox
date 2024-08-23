import { v4 as uuidv4} from 'uuid'



const newChat = ({socket})=>{

    const generateChatID = ()=>{
      const token = window.localStorage.getItem("token");
        const newChatId = uuidv4()
    
        window.location.href = `/?chatID=${newChatId}`
  socket.emit('newChat', {chatID:newChatId, token})
      }

      


      return(
        <>
          


         <button 
          className="border-2 p-[0.35em] rounded-3xl"
          onClick={generateChatID}
          >
            New Chat +
          </button>
         
        </>
      )

}


export default newChat