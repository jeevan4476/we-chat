import express from 'express';
import router from "./routes/sign.js";
import connection from "./database/db.js";
import {createServer} from 'http';
import {startWebSocketServer} from "./websocket/WebSocketServer.js";
import 'dotenv/config'

// connection(process.env.DB_USER,process.env.DB_PASSWORD);

const app= express();
const server = createServer(app);

startWebSocketServer(server);

app.use(express.json())

app.use('/api/v1', router);

app.get("/", (req, res) => {
    res.send("Hello World")
})
server.listen(3000)