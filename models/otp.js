import mongoose from "mongoose"

const otpschema=mongoose.Schema({
    otp:{type: String, 
        required: true},
    email:{type:String,
    required:true}    
},{ timestamps:true})

const Otpgen=mongoose.model("otp",otpschema)

export default Otpgen 