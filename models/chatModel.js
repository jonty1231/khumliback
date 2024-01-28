import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" },],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
    vc: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
},{timestamps:true})

export const Chat= mongoose.model("chat",chatSchema)