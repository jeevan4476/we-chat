import {WebSocketServer} from 'ws';
import jwt from "jsonwebtoken"
import Message from '../model/message.js';
const client = new Map();

export function startWebSocketServer(server){
    const wss = new WebSocketServer({server});

    wss.on('connection',(ws)=>{
        const token = window.getItem('token');
        let userId;
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            userId = decoded.id;
            ws.userId = userId;
            client.set(userId,ws);
            console.log("user connected ",userId);
        }catch(e){
            ws.close();
            return;
        }
        ws.on('message',async (message)=>{
            try{
                const parsedMessage = JSON.parse(message);
                if(parsedMessage.type==='message'){
                    await handleMessage(ws,parsedMessage);
                }
            }catch(e){
                console.log(e);
            }   
        })
        ws.on('close',()=>{
            console.log("user disconnected",userId);
            client.delete(userId);
        })
    })
    console.log('WebSocket server started');
}

async function handleMessage(ws,message){
    const newMessage = new Message({
        userId:ws.userId,
        content:message.content
    });
    await newMessage.save();
    console.log("message saved");
    client.forEach((clientWs,clientId)=>{   
        if(clientWs!=ws && clientWs.readyState===WebSocket.OPEN){
            clientWs.send(JSON.stringify({newMessage}));
        }
    })
}

