import express from "express";
 import {protect} from "../middlewere/protect.js"
import { sendMessage ,allmessage,deletemessage,deleteallmessage} from "../controllers/messagecontroller.js";

 
const router=express.Router(); 

router.post("/message",protect,sendMessage)
router.get("/message/:chatId",protect,allmessage)
router.post("/delete",protect,deletemessage)  
router.post("/deleteall",protect,deleteallmessage)  


export default router