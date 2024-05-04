import { v4 as uuidv4} from 'uuid'



const newChat = ()=>{

    const generateChatID = ()=>{
        const newChatId = uuidv4()
    
        window.location.href = `/?chatID=${newChatId}`
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