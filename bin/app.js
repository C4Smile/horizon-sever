#!/usr/bin/env node

const config = require("../config");
// const cron = require("node-cron");

// const socketio = require("socket.io");

/**
 * Module dependencies.
 */

const app = require("../app");
const debug = require("debug")("btw:server");
const http = require("http");
// const connection = require("../model/connection");
/**
 * Get port from environment and store in Express.
 */

const port = config.port;
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
/* var io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connection(io); */

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  /* cron.schedule("* * * * *", async () => {
    console.log("Checking for backup");
    if (await wasScheduled()) {
      console.log("Saving backup");
      console.log(await saveBackupFile());
      console.log("Backup done");
    } else console.log("There is no scheduled backup");
  }); */
  debug("Listening on " + bind);
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
