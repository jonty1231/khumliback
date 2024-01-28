import jwt from 'jsonwebtoken';

export const createtoken =(id)=>{
   const token= jwt.sign({_id:id},process.env.SECRET_KEY,{ expiresIn:"30d" } )
    return token
}