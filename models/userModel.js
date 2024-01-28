import mongoose from "mongoose";

const userschema = mongoose.Schema({
username:{
    type:String,
    min:3,
    required:true,
    unique:true

},
name:{
  type:String,
  min:3,
  required:true
},
email:{
    type:String,
    required:true,
    unique:true},
password:{
        type:String,
        min:6,
        required:true, },
messagereq:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
},],

friends:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:'user'
},
],
pic:{ url: {
    type: String,
  default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
urlId:{ type: String,}},

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },



},{timestsmps:true})

export const User = mongoose.model("user",userschema)