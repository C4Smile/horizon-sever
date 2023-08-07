// @ts-check
var CryptoJS = require("crypto-js");
const fs = require("fs");
const Router = require("./router");

// mysql
const { insert, select, update } = require("sito-node-mysql");

// auth
const { validator } = require("../utils/secure");

const userRouter = new Router("users", [validator]);

userRouter.addRoute("/save", "POST", [], async (req, res) => {
  console.info(`saving users`);
  const ip = req.socket?.remoteAddress;
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
      const result = await insert(
        "users",
        ["id", "user", "nick", "email", "pw", "date"],
        { ...data, date: new Date().getTime(), nick: data.user }
      );
      console.info(`user created successfully`);
      const expiration = 1;
      const token =
        /* It's encrypting the token */
        CryptoJS.AES.encrypt(
          `${data.user}[!]${data.id}[!]${ip}`,
          "app.elbule.com"
        ).toString();
      const startDate = new Date();
      const endDate = startDate;
      endDate.setDate(startDate.getDate() + expiration);
      await insert("tokens", ["id", "idUser", "start", "end", "token"], {
        idUser: result,
        start: startDate.getTime(),
        end: Number(data.mmr) >= 0 ? "" : endDate.getTime(),
        token,
      });
      console.info(`user logged successfully`);
      // @ts-ignore
      res.status(200).send({ id: result, user: data.user, token, expiration });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: String(err) });
  }
});

userRouter.addRoute("/select-nation", "POST", [], async (req, res) => {
  console.info(`user selects nation`);
  const { user, nation } = req.body;

  try {
    await update(
      "users",
      ["nation"],
      { nation },
      { attribute: "user", operator: "=", value: user }
    );
    res.status(200).send({ message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: String(err) });
  }
});

userRouter.addRoute("/set-nick", "POST", [], async (req, res) => {
  console.info(`user selects nation`);
  const { user, nick, photo } = req.body;
  // validating if exists
  const result = await select(["users"], ["id"], {
    attribute: "nick",
    operator: "=",
    value: nick,
  });
  if (result.rows.length) {
    res.status(200).send({ message: "exist" });
    return;
  }
  // saving file
  let parsedPhoto = "";
  if (photo.length) {
    try {
      const encoded = Buffer.from(
        photo.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const extension = photo.split(";")[0].split("/")[1];
      console.log(`./public/images/users/${user}.${extension}`);
      fs.writeFileSync(`./public/images/users/${user}.${extension}`, encoded);
      parsedPhoto = `./public/images/users/${user}.${extension}`
    } catch (err) {
      console.error(err);
    }
  }
  try {
    await update(
      "users",
      ["nick", "photo", "state"],
      { nick, photo: photo.length ? parsedPhoto : "/images/no-photo.webp", state: 0 },
      { attribute: "user", operator: "=", value: user }
    );
    res.status(200).send({ message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: String(err) });
  }
});

module.exports = userRouter.router;
