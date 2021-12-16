import express, { response } from "express";
import "dotenv/config";
import { router } from "./routes";
import http from "http";
import cors from "cors"
import { Server } from "socket.io";

const app = express();
app.use(cors())
app.use(express.json())
app.use(router)

const serverHttp = http.createServer(app)
const io = new Server(serverHttp, {
    cors: { origin: "*" }
})

const port = process.env.SERVER_PORT || process.env.PORT
serverHttp.listen(port, () => console.log(`🚀 Server is running on PORT ${port}`));

io.on("connection", socket => {
    console.log(`Usuário conectado no socket ${socket.id}`)
})


export { serverHttp, io }