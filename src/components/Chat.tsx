"use client";

import { useState, useEffect } from "react";
import socket from "../lib/socket";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const search = "this is search"

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", input);
      setInput("");
    }
  };

  useEffect(() => {
    socket.on("findDriver", (data) => {
      console.log(data);

    });

    return () => {
      socket.off("findDriver");
    };
  }, []);


  const findDriver = () => {
    console.log("Emitting findDriver event...");
    socket.emit("findDriver", search);
  };


  return (
    <div>
      <div>
        <h2>Chat</h2>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={findDriver}>serachf</button>
    </div>
  );
};

export default Chat;
