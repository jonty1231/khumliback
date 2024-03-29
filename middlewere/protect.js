import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js"


 export const protect=async(req,res,next)=>{
    try {
        const token= req.cookies.khumli;
        if(!token){
          return res.status(200).json({
              success:false,message:"not token" })
            
            
      }

         const {_id}= jwt.verify(token,process.env.SECRET_KEY)
const user=await User.findOne({_id}).select("-password");
  if(!user){
    return  res.status(200).json({
        success:false,
        message:"user not founds"
      
}) 


}else{
  req.user=user;
  
}
  next()
        
    } catch (error) {
        res.status(200).json({
            success:false,
            message:error.message
    })
}
}