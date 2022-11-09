const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const { PORT } = process.env;

assert(PORT, "PORT is required");

module.exports = {
  port: PORT,
};
