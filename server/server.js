const htpp = require("http");
const { WebSocketServer } = require("ws");
const url = require("url");

const server = htpp.createServer();
const wsServer = new WebSocketServer({ server });

const port = 8001;
const host = "192.168.1.11";

let connections = [];

const handleMessage = (bytes) => {
  const message = JSON.parse(bytes.toString());
  broadcast(message);
  console.log(`Connections: ${connections.length}`);
};
const handleClose = (username, connection) => {
  connections = connections.filter((conn) => conn !== connection);
  broadcast({ message: `${username} left the chat!`, from: "system" });
};

const broadcast = (message) => {
  connections.forEach((conn) => {
    conn.send(JSON.stringify(message));
  });
};

wsServer.on("connection", (connection, request) => {
  const { username } = url.parse(request.url, true).query;
  connections.push(connection);
  broadcast({ message: `${username} joined the chat!`, from: "system" });
  connection.on("message", (message) => handleMessage(message));
  connection.on("close", () => handleClose(username, connection));
});

server.listen(port, host, () => {
  console.log(`Listening on Port: ${port}`);
});
