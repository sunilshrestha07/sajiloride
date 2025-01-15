import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "https://your-vercel-app.vercel.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  socket.on("findDriver", (data) => {
    console.log("user is searching for driver", data);
    io.emit("findDriver", 'sdfjdlf');
  });
});

httpServer.listen(4000, () => {
  console.log("Socket.IO server runnung");
});
