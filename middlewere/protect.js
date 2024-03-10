import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js"


 export const protect=async(req,res,next)=>{
    try {
        const {khumli}= req.cookies;
         const {_id}= jwt.verify(khumli,process.env.SECRET_KEY)
const user=await User.findOne({_id}).select("-password");
  if(!user){
    return  res.status(200).json({
        success:false,
        message:"user not found"
      
})


}
  req.user=user;
  next()
        
    } catch (error) {
        res.status(200).json({
            success:false,
            message:error.message
    })
}
}