const Router = require("./router");

// auth
const { validator } = require("../utils/secure");

const nationRouter = new Router("nations", [validator]);

module.exports = nationRouter.router;
