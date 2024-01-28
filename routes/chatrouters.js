import  express  from "express";
import { protect } from "../middlewere/protect.js";
import { accesschat,fetchchat,creategroup,fetchFriend,Vc } from "../controllers/chatcontroller.js";



const router=express.Router();

router.post("/accesschat",protect,accesschat)
router.get("/accesschat",protect,fetchchat)
router.post("/creatgroup",protect,creategroup)
router.get("/accesschat/:id",protect,fetchFriend)
 router.post("/vc",protect,Vc)




export default router