import io from "socket.io-client";
import { Socket } from "socket.io-client";

const socket: typeof Socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export default socket;
