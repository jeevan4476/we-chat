import express, { Router } from 'express';
import router from "./routes/sign.js";
import connection from "./database/db.js";
import 'dotenv/config'

connection(process.env.DB_USER,process.env.DB_PASSWORD);
const app= express();

app.use(express.json())
app.get('/api/v1',(req,res)=>{
    res.json({
        message:"yes"
    })
})
app.use('/api/v1', router);

app.listen(3000,()=>{
    console.log("running!")
})