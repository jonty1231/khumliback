import { Chat } from "../models/chatModel.js"
import { Message } from "../models/messageModels.js"
import { User } from "../models/userModel.js"

 export  const sendMessage=async(req,res)=>{

    
try {
  const {content,chatId}=req.body
  if(!content || !chatId){
    return res.status(200).json({
        success:false,
        message:"faild"
    }) 
  }

  const newmessage= {
    sender:req.user._id,
    content,
    chat: chatId,
  }
   const createmessage= await Message.create(newmessage)
   let message= await Message.findOne({_id:createmessage._id}).populate("sender","name pic").populate("chat")
   message = await User.populate(message, {
    path: "chat.users",
    select: "name pic email",
  });
  await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
   res.status(200).json(message)

} catch (error) {
    res.status(200).json({
        success:false,
        message:error.message
       })
}
    
}

export const allmessage=async(req,res)=>{
    try {
        
        const message= await Message.find({chat:req.params.chatId}).populate("sender","name pic email").populate("chat")
        res.status(200).json({
            success:true,
            message
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const deletemessage=async(req,res)=>{
    try {
        const {id}=req.body;
        const delmess=await Message.findByIdAndDelete({_id:id})
        res.status(200).json({
            success:true,
            message:"delete"
        })


    } catch (error) {
        
    }
}

export const deleteallmessage=async(req,res)=>{
    try {
        const {id}=req.body;

        const ress=await Message.deleteMany({chat:id})
      
        
       
        res.status(200).json({
            success:true,
            message:'delete all'
        })
    } catch (error) {
        
    }
}