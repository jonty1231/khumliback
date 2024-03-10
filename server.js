import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import cookiparser from "cookie-parser"
const app= express()
app.use(express.json());
const front="https://khumlibawa.netlify.app/"
app.use(cors({ origin:front,
credentials:true,}))
app.use(cookiparser())






import userrouter  from "./routes/userRouter.js"
import chatrouter from "./routes/chatrouters.js"
import messageroute from "./routes/messagerouter.js"
app.get("/",(req,res)=>{res.json({OK:"ko"})})
 app.use("/",userrouter)
 app.use("/",chatrouter)
app.use("/",messageroute)


import {createServer} from "http";
 import { Server } from "socket.io"
const server= createServer(app);

const io = new Server(server,{
  pingTimeout: 60000,
  cors:[front],
  credentials:true,
})


io.on('connection',(socket)=>{

socket.on('setup',(userData)=>{
  socket.join(userData);
  socket.emit("connected");
})

socket.on("join chat",(room)=>{
  socket.join(room);
});

socket.on("typing", (room) => socket.in(room).emit("typing"));
socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));



socket.on("new message", (newMessageRecieved,id,allmes) => {
  var chat = newMessageRecieved.chat;

  if (!chat.users) return console.log("chat.users not defined");

  chat.users.forEach(() => {
    if (id == newMessageRecieved.sender._id) return ;
   
    socket.in(id).emit("message recieved",newMessageRecieved,allmes);
  });

});

socket.on("vc",(room)=>socket.in(room).emit("video"))



socket.off("setup", () => {
  console.log("USER DISCONNECTED");
  socket.leave(userData);
});
})



const PORT=process.env.PORT || 8080
mongoose.connect(process.env.DATA_BASE)
.then(()=>server.listen(PORT,()=>{
    console.log(`server are running on ${PORT} PORT`)

}))