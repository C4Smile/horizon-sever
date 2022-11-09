const uuidv4 = require("uuid").v4;
const cron = require("node-cron");

const prefabs = require("../utils/prefabs.json");

const messages = new Set();
const users = new Map();

const messageExpirationTimeMS = 5 * 60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("askBackup", (value) => {
      this.askBackup();
    });

    socket.on("list", (value) => {
      this.backupList();
    });

    socket.on("load", (value) => {
      this.load(value);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      this.disconnect();
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  verify = (hash) => {};

  askBackup = async () => {
    this.io.sockets.emit("askBackup", {
      action: "askBackup",
    });
  };

  backupList = async () => {
    this.io.sockets.emit("list", {
      action: "list",
    });
  };

  load = (obj) => {
    if (obj.id && obj.id.length === 1) this.simpleLoad(obj);
    else this.bigLoad(obj);
  };

  bigLoad = async (obj) => {
    const collection = obj.collection;
    const attributes = obj.attributes;
    const lang = obj.lang ? obj.lang : "es";
    const result = await loadArrayFromFirebase(
      collection,
      lang,
      prefabs[attributes] ? prefabs[attributes] : attributes
    );
    this.io.sockets.emit("send", { action: "load", collection, result });
  };

  simpleLoad = async (obj) => {
    const id = obj.id;
    const collection = obj.collection;
    const attributes = obj.attributes;
    const lang = obj.lang ? obj.lang : "es";
    const result = await loadSimpleFromFirebase(
      collection,
      id,
      lang,
      prefabs[attributes] ? prefabs[attributes] : attributes
    );
    this.io.sockets.emit("send", {
      action: "load",
      id,
      collection,
      result,
    });
  };

  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  handleMessage(value) {
    const message = {
      id: uuidv4(),
      user: users.get(this.socket) || defaultUser,
      value,
      time: Date.now(),
    };

    messages.add(message);
    this.sendMessage(message);

    setTimeout(() => {
      messages.delete(message);
      this.io.sockets.emit("deleteMessage", message.id);
    }, messageExpirationTimeMS);
  }

  disconnect() {
    users.delete(this.socket);
  }
}

function connection(io) {
  io.on("connection", (socket) => {
    console.log("User connected");
    new Connection(io, socket);
  });
}

module.exports = connection;
