const { log } = require("console");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { dbConnect } = require("./db");
const sendOtpEmail = require('./services/email')
const Chat = require('./models/chat')
const {otpVerification, validateToken, login}=require('./services/user');
const { where } = require("sequelize");


dbConnect();











// app.get("/", (req, res) => {
//   res.send("hello from backend server");
// });

const filteredSockets = new Map();

io.on("connection", (socket) => {
  console.log("a user connected");
  const chatID = socket.request._query.chatID;



  const isLoggedIn = socket.request._query.isLoggedIn;
  socket.on('login',async (data)=>{//TODO: revise this part, logic is a little bit off
    console.log('data on login is : ', data);
    await login(data)
    socket.emit('otpsent')
    // const [user, created] = await User.findOrCreate({
    //   where:{email:data.email},
    //   defaults:{
    //     // email:data.email,
    //     otp
    //   }
    // })

  });
  socket.on('otpVerification', async (data)=>{
    console.log(data);
    const result = await otpVerification(data)
    if(result.verified == false) {
      console.log('resultJWT: ', result);
      socket.emit('otpFailed')
    }
    else {
      socket.emit('otpSuccess', {token:result.token})}
    
    
  });
  if (!isLoggedIn) return;

  addPrivateChat(socket);
  emitToPrivateChat({ socket, chatID });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

const emitToPrivateChat =  ({ socket, chatID }) => {
  socket.on("message",  async(data) => {

    
    const msg = data.message;
    const token = data.token;
    
    // if (!filteredSockets.has(chatID)) return;
    
    // if (!filteredSockets.get(chatID).has(socket.id)) return;
    const isValid =  validateToken(token)
    if(!isValid){
      console.log('invalid token');
      return
    }
    console.log(isValid);
    await Chat.findOrCreate(
      {where:{ name : chatID },
        defaults:{ownerId:isValid.userID}
       }
    )

    filteredSockets.get(chatID).forEach((oldSocket, socketID) => {//js Maps forEach loop are so misleading ==> should be (id,socket) 
      if (oldSocket === socket) return; //transport message to all except the one who sent the message, otherwise this will duplicate the message
      oldSocket.emit("message", msg);
    });
  });
};

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
