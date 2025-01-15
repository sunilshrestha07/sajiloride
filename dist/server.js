"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var httpServer = (0, http_1.createServer)();
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
io.on("connection", function (socket) {
    console.log("New client connected:", socket.id);
    socket.on("message", function (data) {
        console.log("Message received:", data);
        io.emit("message", data); // Broadcast message to all clients
    });
    socket.on("disconnect", function () {
        console.log("Client disconnected:", socket.id);
    });
});
httpServer.listen(4000, function () {
    console.log("Socket.IO server running on http://localhost:4000");
});
