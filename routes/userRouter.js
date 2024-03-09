import express from "express";
import {registerUser,loginUser,getuser,searschuser,sendRequest,getRequest,logoutuser,deletereq,addimg,deletefriend,otpgenerat,checkOtp} from "../controllers/userontroller.js"
import {protect} from "../middlewere/protect.js"
import { singleupload } from "../middlewere/imgupload.js";

const route= express.Router();
 
route.post("/register",registerUser)
route.post("/login",loginUser)
route.post("/sendotp",otpgenerat)
route.post("/verifyotp",checkOtp)

route.post("/getuser",protect,getuser)

route.get("/serachusers",protect,searschuser)
route.post('/sendrequest',protect,sendRequest) 
route.get('/getrequest',protect,getRequest)
route.get('/logout',logoutuser)
route.post('/deletereq',protect,deletereq)
route.post("/imgupload",protect,singleupload,addimg)
route.post('/deletefriend',protect,deletefriend)

export default route