import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { RoomHandler } from "./socket/romSocket.js";
import { StreamHandler } from "./socket/streamSocket.js";


const app = express();
app.use(cors);
const port = 4000;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("a user connected");
    RoomHandler(socket)

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});