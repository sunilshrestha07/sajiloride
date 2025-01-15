import io from "socket.io-client";
import { Socket } from "socket.io-client";

const socket: typeof Socket = io("https://sajiloride-production.up.railway.app/", {
  transports: ["websocket"],
});

export default socket;
