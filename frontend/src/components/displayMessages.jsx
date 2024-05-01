function DisplayMessages({messages}) {

    return (
        <>
       
          {messages.map((message) => (
            <div className="flex justify-start mb-4" key={message.id}>
              {message.sender}
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                {message.text}
              </div>
              <div className="text-xs mt-8">
                {new Date(message.time).toLocaleTimeString()}
              </div>
            </div>
          ))}
        
        </>
    )
}


export default DisplayMessages