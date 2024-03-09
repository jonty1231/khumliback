import { User } from "../models/userModel.js";
import {hashpassword,verifypassword} from "../helper/hashingPassword.js"
import { createtoken } from "../helper/token.js";
import { getdatauri } from "../middlewere/imgupload.js";
import { imguploading ,deleteimg} from "../helper/cloudnery.js";
import { Message } from "../models/messageModels.js";
import { Chat } from "../models/chatModel.js";
import Otpgen from "../models/otp.js";
import { sendMail } from "../helper/nodemailer.js";


export const otpgenerat=async(req,res)=>{
  try {
      const {email}=req.body
      if(!email){ res.status(200).json({success:false,message:"Enter email"})}
   const allreadyuser=await User.findOne({email})
   const otp= Math.floor(Math.random()*10000)
   if(allreadyuser){
      res.status(201).json({ success:false,message:"email allready exist"})
      return  } 
   else{
const alreadyotp = await Otpgen.findOne({email})
if(alreadyotp){
  await Otpgen.findOneAndDelete({email})
  await Otpgen.create({email,otp})
  sendMail(email,otp)
  res.status(201).json({ success:true,message:"otp sent",otp})

}
else{ 
  await Otpgen.create({email,otp})
  sendMail(email,otp)
  res.status(201).json({ success:true,message:"otp sent",otp})

}


   }

  } catch (error) {
      res.status(404).json({success:false,message:error.message})
  }
}
 
export const checkOtp=async(req,res)=>{
  try {
     const {otp,email}=req.body;
const checkemail=await Otpgen.findOne({email})
let date1=new Date(checkemail.createdAt)
let date2= new Date(Date.now())
let diff=date2.getMinutes() - date1.getMinutes()
  if(checkemail.otp==otp && diff < 10){
      await Otpgen.findByIdAndDelete({_id:checkemail._id})
  res.status(201).json({success:true,message:"correct otp"})

  }
  res.status(201).json({message:"Enter valide Otp"})

} catch (error) {
      
  }
}


 export   const registerUser= async (req,res)=>{
    try {
   const {username,name,email,password}=req.body;
      const userexist= await User.findOne({email})
      if(userexist){
        return res.status(200).json({
          success:false,
          message:'email already exist'
        })
      };
    const nameexist = await User.findOne({username})  ;
    if(nameexist){
      return res.status(200).json({
        success:false,
        message:`${name} already exist`
      })
    };
    const hashedpassword = await hashpassword(password)
    const user= await User.create({username,name,email,password:hashedpassword})
const id= await user._id.toString();
res.cookie("khumli",createtoken(id),{
  path:"/",
  httpOnly:true,
  expires:new Date(Date.now()+10*100 *100*800 *100000)
})

res.status(200).json({
  success:true,
  message:'user register'
})


    } catch (error) {
      res.status(500).json({
        success:false,
        message:error.message
      })
    }
  }


export const loginUser= async (req,res)=>{
try{
const {email,password}=req.body;
const emailvarify= await User.findOne({email});
if(!emailvarify){
  return res.status(202).json({
    success:false,
    message:"User not found"
  })
};
const veryfypassword= await verifypassword(password,emailvarify.password);
if(!veryfypassword){
  return res.status(202).json({
    success:false,
    message:"User not found"
  })
};
   const id= await emailvarify._id.toString()
 res.status(201).cookie("khumli",createtoken(id),{
   path:"/",
   httpOnly:true,
   expires:new Date(Date.now()+10*100 *100*800 *100000)
 }).json({
  success:true,
  message:"login"
 })

}catch(error){
  res.status(500).json({
    success:false,
    message:error.message
  })
}

} 

export const getuser=async(req,res)=>{
  try {
    const user= req.user;
   
    if(!user){
      return res.status(201).json({
        success:false,
        
      })
    }
    else {
      res.status(201).json({
      success:true,
      user
      
    })}

  } catch (error) {
    res.status(201).json({
      success:false,
      message:error.message
    })
  }
}

export const searschuser= async(req,res)=>{
  try {
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },

        ],
      }
    : {};

  const users = await User.find(keyword).find({_id:{$ne:req.user._id}}).select("-password")
    
  res.status(200).json({
    success:true,
   
     users
  })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const sendRequest= async(req,res)=>{
  try {
    const user= req.user;
    const {_id} =req.body;
   const friend=await User.findOne({_id}).select("-password")
     await friend.messagereq.push(user._id)
      await friend.save()
      res.status(200).json({
        success:true,
       message:'request sending..'
      })
  } catch (error) {
    
  }
}

export const getRequest=async(req,res)=>{
  try{
const user=req.user;
const reqfriends= await User.find({_id:{$in:user.messagereq}}).select("-password").select("-messagereq")
res.send(reqfriends)  

  }catch(error){

  }
}
export const logoutuser=async(req,res)=>{
 try {
  res.status(200).cookie('khumli','',{
    path:"/",
    httpOnly:true,
    expires:new Date(Date.now())
  }).json({success:true,message:"logout"})
   
 } catch (error) {
  
 }
}

export const deletereq=async(req,res)=>{
  try {
      const {id}=req.body;

     
      if(id){
        const user= await User.findOne({_id:req.user._id});
        const indexx=await user.messagereq.indexOf(id)
        await user.messagereq.splice(indexx,1)
        await user.save()

        res.json({
          success:true,
          message:'remove'
        })
      }
  } catch (error) {
    
  }
}

export const addimg=async(req,res)=>{
try {
  const photo=req.file;


const imguri=getdatauri(photo)
const imgdata= await imguploading(imguri.content)
const user=await User.findOne({_id:req.user._id})
if(user.pic.urlId){
deleteimg(user.pic.urlId)
const adimg = await User.findOneAndUpdate({_id:req.user._id},{pic:{url:imgdata.url,urlId:imgdata.public_id}})

 await adimg.save()
 
return res.status(200).json({
  success:true,
  message:"img change",
 
})
}
else{const adimg = await User.findOneAndUpdate({_id:req.user._id},{pic:{url:imgdata.url,urlId:imgdata.public_id}})

await adimg.save()
 
 return res.status(200).json({
  success:true,
  message:"img change",
 
})}
} catch (error) {
  
}


}

export const deletefriend=async(req,res)=>{
  try {
    
    const {id,fri}=req.body;
    
    await Message.deleteMany({chat:id})
    await Chat.deleteOne({_id:id})
    const user= await User.findOne({_id:req.user._id})
    const friend=await  User.findOne({_id:fri})
    
    if(user && friend){
      const index= await user.friends.indexOf(friend._id)
    
      const findex=await friend.friends.indexOf(user._id)
      await user.friends.splice(index,1)
      await friend.friends.splice(findex,1)
      // console.log(index,findex)
      await user.save()
      await friend.save()
      res.status(200).json({
        success:true,
        message:"friend remove"
      })
       
    }
   


  } catch (error) {
    
  }
}