const socket = IO("http://localhost:3022/");

socket.on("welcome", (data) => {
  console.log(data);
});
