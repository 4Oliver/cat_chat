import express from "express";
import { Server as IO } from "socket.io";

const port = 3022;

const expressApp = express();

expressApp.use(express.static("./website"));

const appServer = expressApp.listen(port, () => {
  console.log("Server is up!");
});

export const IOServer = new IO(appServer);

IOServer.on("connection", async (socket) => {
  socket.emit("welcome", "hello world!");
  console.log("welcome");
});
