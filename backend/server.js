const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

let waterLevel = 50; 
let pumpStatus = "OFF";

app.get("/data", (req, res) => {
  res.json({ waterLevel, pumpStatus });
});

app.post("/control", (req, res) => {
  pumpStatus = req.body.pumpState;
  io.emit("statusUpdate", { waterLevel, pumpStatus });
  res.send({ status: "success" });
});

io.on("connection", (socket) => {
  console.log("Client connected");
});

server.listen(5000, () => console.log("Server running on port 5000"));
