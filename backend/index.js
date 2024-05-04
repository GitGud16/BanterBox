const { log } = require("console");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { dbConnect } = require("./db");
const sendOtpEmail = require('./services/email')
const User = require('./models/user')



dbConnect();











app.get("/", (req, res) => {
  res.send("hello from backend server");
});

const filteredSockets = new Map();

io.on("connection", (socket) => {
  console.log("a user connected");
  const chatID = socket.request._query.chatID;

  const isLoggedIn = socket.request._query.isLoggedIn;

  socket.on('login',async (data)=>{//TODO: revise this part, logic is a little bit off
    //TODO:
    console.log('login detected');
    const otp = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    console.log(otp);
    sendOtpEmail({email:data.email, otp})

    let user = await User.findOne({where:{email:data.email}})
    if(user){
      user.otp=otp
      await user.save
    }else{
      user = await User.create({email:data.email, otp})
    }
    socket.emit('otpsent')
    // const [user, created] = await User.findOrCreate({
    //   where:{email:data.email},
    //   defaults:{
    //     // email:data.email,
    //     otp
    //   }
    // })

  });
  socket.on('otpVerification', (otp)=>{
    //TODO:
  });
  if (!isLoggedIn) return;

  addPrivateChat(socket);
  emitToPrivateChat({ socket, chatID });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

const emitToPrivateChat = ({ socket, chatID }) => {
  socket.on("message", (msg) => {
    filteredSockets.get(chatID).forEach((oldSocket, socketID) => {
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
