import multer from "multer";
import datauri from "datauri/parser.js";
import  path  from "path";



const storage= multer.memoryStorage()

 export const singleupload = multer({storage:storage}).single("file")


export const getdatauri=(file)=>{
    const parser= new datauri();
    const extname = (path.extname(file.originalname)).toString();
    return parser.format(extname,file.buffer);

} 