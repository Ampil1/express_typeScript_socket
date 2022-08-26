import * as express from "express";
import * as dotenv from "dotenv";
import * as socketio from "socket.io";
import * as path from "path";
dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);

var http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("test/index.html"));
});
app.get('/test', function(req, res){ res.sendFile(path.resolve('test/client.html'));
});
app.get("/node", (req: any, res: any) => {
  res.send("Welcome into NodeJs ");
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: any) {
  console.log("a user connected");
  socket.on("message", function(message: any) {
    console.log(message);
  });

  socket.on('disconnect', function () {
    console.log('A user disconnected');
 });
});

const server = http.listen(4000, function() {
  console.log('http//localhost:4000');
});