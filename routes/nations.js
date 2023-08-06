// @ts-check

const Router = require("./router");

const { select } = require("sito-node-mysql");

// auth
const { validator } = require("../utils/secure");

const nationRouter = new Router("nations", [validator]);

nationRouter.addRoute("/all", "GET", [], async (req, res) => {
  console.info(`listing nation`);
  const { lang } = req.body;
  try {
    const result = await select(
      ["nations"],
      ["id", "name", "description", "advantage", "photo"],
      []
    );
    console.info(
      `${result.list ? result.list.length : 0} retrieved successfully`
    );
    res.status(200).send({ ...result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: String(err) });
  }
});

module.exports = nationRouter.router;
