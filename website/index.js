import { io } from "./socket.io.esm.min.js";

const socket = io();

socket.on("welcome", (data) => {
  console.log('got welcome!', [data]);
});
