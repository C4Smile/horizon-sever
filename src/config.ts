import dotenv from "dotenv";
import assert = require("assert");

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD, CHATBOT_API, CHATBOT_TOKEN } = process.env;

assert(DB_PORT, "PORT is required");

const config = {
  db: { host: DB_HOST, port: Number(DB_PORT), user: DB_USER, name: DB_NAME, password: DB_PASSWORD },
  chatbot: {
    api: CHATBOT_API,
    token: CHATBOT_TOKEN,
  },
};

export default config;
