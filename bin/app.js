#!/usr/bin/env node

const config = require("../config");

const {
  resourcesChronons,
  playerCounter,
} = require("../chronons/resourcesChronons");

/**
 * Module dependencies.
 */

const app = require("../app");
const debug = require("debug")("btw:server");
const http = require("http");

/**
 * Get port from environment and store in Express.
 */

const port = config.port;
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("connected", { message: "a new client connected" });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  resourcesChronons();
  playerCounter();
  console.log("Listening on " + bind);
};

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
