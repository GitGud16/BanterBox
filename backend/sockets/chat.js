const { validateToken, } = require('../services/user');


const newChat = ({socket,Chat}) => {
    socket.on("newChat", async (data) => {
      const token = data.token;
      const isValid = validateToken(token)
      if (!isValid) {
        console.log('invalid token');
        return
      }
      await Chat.findOrCreate(
        {
          where: { name: data.chatID },
          defaults: { ownerId: isValid.userID }
        }
      )
    })
  }

  const setChatPrivacy = async ({socket,Chat}) => {
    socket.on("setChatPrivacy", async (data) => {
      const token = data.token;
      const isValid = validateToken(token)
  
      if (!isValid) throw new Error('invalid token')
  
      await Chat.update({ privacy: data.privacy }, { where: { name: data.chatID, ownerId: isValid.userID } })
      socket.emit("setPrivacy", { chatID: data.chatID, privacy: data.privacy });
    })
  };

  

  const emitToPrivateChat = ({ socket, chatID, Chat, filteredSockets, Message }) => {
    socket.on("message", async (data) => {
  
  
      const msg = data.message;
      const token = data.token;
  
      // if (!filteredSockets.has(chatID)) return;
  
      // if (!filteredSockets.get(chatID).has(socket.id)) return;
      const isValid = validateToken(token)
      if (!isValid) {
        console.log('invalid token');
        return
      }
      console.log(isValid);
      await Chat.findOrCreate(
        {
          where: { name: chatID },
          defaults: { ownerId: isValid.userID }
        }
      )
      await Message.create({
        chatID,
        text:data.message.text,
        sender: isValid.userID
      })
  
      filteredSockets.get(chatID).forEach((oldSocket, socketID) => {//js Maps forEach loop are so misleading ==> should be (id,socket) 
        if (oldSocket === socket) return; //transport message to all except the one who sent the message, otherwise this will duplicate the message
        oldSocket.emit("message", msg);
      });
    });
  };

  module.exports = { 
    newChat,
    setChatPrivacy,
    emitToPrivateChat,

}