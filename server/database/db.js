import mongoose from "mongoose";

//connection for mongodb locally using docker
const connection = async ( username, password)=>{
    const url = `mongodb://${username}:${password}@localhost:27017/`  
    try{
        await mongoose.connect(url);
    }catch(e){
        console.log("error while connecting",e);
    }
}

export default connection