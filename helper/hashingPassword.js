import bcript from 'bcrypt';

export const hashpassword= async(password)=>{
    return  await bcript.hash(password,10)
}
export const verifypassword=async(password,hashpass)=>{
    return await bcript.compare(password,hashpass)
}