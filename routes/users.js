const Router = require("./router");

// mysql
const { insert, select } = require("sito-node-mysql");

// auth
const { validator } = require("../utils/secure");

const userRouter = new Router("users", [validator]);

userRouter.addRoute("/save", "POST", [], async (req, res) => {
  console.info(`saving users`);
  const { data } = req.body;

  try {
    // validating user
    const existedCI = await select(
      "users",
      ["id"],
      [{ attribute: "ci", value: data.ci, operator: "=" }]
    );
    if (existedCI.rows.length) {
      res.status(200).send({ message: "exist" });
    } else {
      const result = await insert(
        "users",
        ["id", "user", "email", "name", "pw", "ci", "fvCI", "date"],
        { ...data, date: new Date().getTime() }
      );
      console.info(`user created successfully`);
      res.status(200).send({ ...result });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: String(err) });
  }
});

module.exports = userRouter.router;
