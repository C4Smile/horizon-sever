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
      ["id", "user", "email"],
      [
        { attribute: "user", value: data.user, operator: "=" },
        { attribute: "email", value: data.email, operator: "=", logic: "OR" },
      ]
    );
    if (existedCI.rows.length) {
      if (existedCI.rows[0].email === data.email)
        res.status(200).send({ message: "email" });
      else if (existedCI.rows[0].user === data.user)
        res.status(200).send({ message: "user" });
    } else {
      console.log(data);
      const result = await insert(
        "users",
        ["id", "user", "nick", "nation", "email", "pw", "date"],
        { ...data, date: new Date().getTime(), nick: data.user }
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
