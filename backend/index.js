require('dotenv').config()
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { dbConnect } = require("./db");
const Chat = require('./models/chat')
const Message = require('./models/messages')
const {handleLogin, handleOtpVerification} = require('./sockets/auth')
const {newChat, setChatPrivacy,  emitToPrivateChat} = require('./sockets/chat')
const {inviteUserToChat,} = require('./sockets/user');
const { validateToken } = require('./services/user');
dbConnect();




const domain = process.env.PUPLIC_URL;






// app.get("/", (req, res) => {
//   res.send("hello from backend server");
// });

const filteredSockets = new Map();

io.on("connection", (socket) => {
  console.log("a user connected");
  const chatID = socket.request._query.chatID;



  const isLoggedIn = socket.request._query.isLoggedIn;
  
  handleLogin(socket)

  handleOtpVerification(socket)

  if (!isLoggedIn) return;

  newChat({socket, Chat})

  addPrivateChat(socket);

  setChatPrivacy({socket, Chat});
  inviteUserToChat({socket, domain});
  emitToPrivateChat({ socket, chatID, Chat, filteredSockets, Message });

  socket.on('getAllChats', async (data)=>{
    const token = data.token;
    const isValid = validateToken(token)

    if (!isValid) {
      console.log('invalid token');
      return
    }

    const chats = await Chat.findAll({
      where:{
        ownerId: isValid.userID
      }
    })
    socket.emit('getAllChats', chats)
  })

  //handle disconnect
  socket.on('getMessages', async (data)=>{
    const token = data.token;
    const isValid = validateToken(token)

    if (!isValid) {
      console.log('invalid token');
      return
    }
    const messages = await Message.findAll({
      where:{
        chatID: data.chatID
      }
    })
    socket.emit('getMessages', messages)
  })

});

server.listen(3000, () => {
  console.log("listening on *:3000");
});



const addPrivateChat = (socket) => {
  const chatID = socket.request._query.chatID;

  if (!filteredSockets.has(chatID)) {
    filteredSockets.set(chatID, new Map());
  }
  filteredSockets.get(chatID).set(socket.id, socket);
};







//TODO: نحذف السوكيت من الشات القديم مع الغامدي
//TODO: can be using caching
//TODO: use set instead of array for {generalSockets[]}
// <3
