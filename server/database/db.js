import mongoose from "mongoose";

const connection = async ( username, password)=>{
    const url = `mongodb://localhost:27017/`  
    try{
        await mongoose.connect(url);
        console.log("connected to database");
    }catch(e){
        console.log("error while connecting",e);
    }
}

export default connection