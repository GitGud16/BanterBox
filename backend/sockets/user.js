const {sendInvitationEmail} = require('../services/email')
const { validateToken, } = require('../services/user');


const inviteUserToChat = ({socket,domain}) => {

    socket.on("invite",async(data)=>{
      const token = data.token;
      const isValid = validateToken(token)
      if(!isValid) throw new Error('invalid token')
  
        const url = `${domain}/?chatID=${data.chatID}`
      sendInvitationEmail({
        email: data.invitedUserEmail,
        url
      })
  
    })
  }

  module.exports = {inviteUserToChat}