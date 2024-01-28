import {v2 as cloudinary} from "cloudinary"
import fs from 'fs';

cloudinary.config({
    cloud_name: 'dxci0rkha', 
  api_key: '528863775694642', 
  api_secret: 'w88W3ytAYEJQ-aOGbHGakIOn8L8' 
})
export const imguploading=async(img)=>{
    try {
       if(!img) return null ; 
const response=await cloudinary.uploader.upload(img,{
    resource_type:"auto"
})
return response;
    } catch (error) {
        fs.unlinkSync(filetoupload)
          return null;
    }
}

export const deleteimg=async (imgid)=>{
    try {
      if(imgid){await cloudinary.uploader.destroy(imgid)}
    } catch (error) {
        fs.unlinkSync(filetoupload)
          return null;
    }
}