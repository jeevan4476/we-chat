import mongoose from "mongoose";

const mongooseSchema = mongoose.Schema({   
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }}
);

const Message = mongoose.model('message', mongooseSchema);  

export default Message;