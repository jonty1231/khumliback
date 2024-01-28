
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";


  export  const accesschat=async(req,res)=>{
    try {
        const {userId}=req.body;
        if(!userId){
            res.status(201).json({
                success:false,
                message:"not found"
            })};
let ischat =await Chat.find({
isGroupChat:false,
$and:[
    {users:{$elemMatch:{$eq:req.user._id}}},
    {users:{$elemMatch:{$eq:userId}}}
]}).populate("users",'-password').populate('latestMessage');

ischat= await User.populate(ischat,{
    path:'latestMessage.sender',
    select:"name pic email"
})
if(ischat.length>0){
  return  res.send(ischat[0]);
}
else{
const chatData={
    chatName:"sender",
    isGroupChat:false,
    users:[req.user._id,userId]
}
   const usss= await Chat.create(chatData);

const removereq= await User.findOne({_id:req.user._id})
const findfriend=await User.findOne({_id:userId})
await removereq.friends.push(userId);


await findfriend.friends.push(req.user._id)
const index=await removereq.messagereq.indexOf(userId);
  await removereq.messagereq.splice(index,1)
  await removereq.save();
  await findfriend.save();
 
return res.status(200).json({
    success:true,
    usss
})}



    } catch (error) {
        res.status(200).json({
            success:false,
            message:error.message
        })
    }
  }


  export const fetchchat=async(req,res)=>{
   try {
    let friends= await Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password").populate("groupAdmin", "-password") .populate("latestMessage")
    .sort({ updatedAt: -1 }) 


    res.status(200).json({
        success:true,
        friends})

   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message})

   }
  }

  export const creategroup=async(req,res)=>{
   try {
    const {users,groupname}=req.body;
    if(!users || !groupname){
        return res.status(200).json({
            success:false,
            message:"enter data"
        })}
let alluser= JSON.parse(users)
if(alluser.length <2){
    return(300).json({
        success:false,
        message:"add more users"
    })
}
alluser.push(req.user._id);
const group =await Chat.create({chatName:groupname,isGroupChat:true, users:alluser, groupAdmin:req.user._id})
res.status(200).json({
    success:true,
    message:"group created"
})

   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
   }
  }

export const fetchFriend=async(req,res)=>{
    try {
        
const {id}= req.params;

const findchat= await Chat.findOne({_id:id}).populate("users","-password -friends -messagereq")

res.status(200).json({
 success:true,
 findchat

})

    } catch (error) {
        
    }
}

export const Vc=async(req,res)=>{
    try {
        const {id}=req.body;
   
const ress= await Chat.findByIdAndUpdate({_id:id},{vc:req.user._id})

res.status(200).json({
    success:true,
    message:"vc"
})
        
    } catch (error) {
        
    }
}