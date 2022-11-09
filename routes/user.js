const express = require("express");

const { error, log, info, good } = require("../utils/chalk");

// locals
const {
  login,
  logOut,
  register,
  loadUsers,
  loadUser,
  getUserNotifications,
} = require("../services/user");

// auth
const { verifyBearer } = require("../utils/secure");

const load = require("../utils/loading");

const router = express.Router();

router.post("/validate", async (req, res) => {
  if (req.headers.authorization) {
    if (req.headers.authorization.indexOf("Bearer ") === 0) {
      const verified = verifyBearer(req.headers.authorization);
      if (verified) {
        load.start();
        try {
          load.stop();
          res.send({ status: 200, data: { message: "authorized" } });
          return;
        } catch (err) {
          load.stop();
          log(error(err));
          res.sendStatus(500);
          return;
        }
      }
    }
  }
  res.send({ status: 200, data: { error: "unauthorized" } });
});

router.post("/logout", async (req, res) => {
  log(info("Logging out user"));
  load.start();
  try {
    const { user } = req.body;
    const result = await logOut(user);
    switch (result.status) {
      case 200:
        log(good(`${user} logged out successful`));
        res.send(result).status(200);
        break;
      default:
        log(error(result.error));
        res.send({ error: result.error }).status(result.status);
        break;
    }
  } catch (err) {
    log(error(err));
    res.sendStatus(500);
  }
  load.stop();
});

router.post("/login", async (req, res) => {
  log(info("Logging user"));
  load.start();
  try {
    const { user, password } = req.body;
    const parsedUser = user.split("@")[0];
    const result = await login(parsedUser, password);
    switch (result.status) {
      case 200: {
        log(good(`${user} logged successful`));
        res.send(result).status(200);
        break;
      }
      default:
        log(error(result.error));
        res.send({ error: result.error }).status(result.status);
        break;
    }
  } catch (err) {
    log(error(err));
    res.sendStatus(500);
  }
  load.stop();
});

router.get("/list", async (req, res) => {
  try {
    load.start();
    const result = await loadUsers();
    res.send(result).status(result.status);
    load.stop();
  } catch (err) {
    load.stop();
    log(error(err));
    res.sendStatus(500);
  }
});

router.get("/notifications", async (req, res) => {
  try {
    load.start();
    const user = req.query.user;
    const result = await getUserNotifications(user);
    res.send(result).status(result.status);
    load.stop();
  } catch (err) {
    load.stop();
    log(error(err));
    res.sendStatus(500);
  }
});

router.get("/get", async (req, res) => {
  try {
    load.start();
    const option = req.query.id;
    const result = await loadUser(option);
    if (result.error == undefined) res.json(result);
    else res.json(result.error);
    load.stop();
  } catch (err) {
    load.stop();
    log(error(err));
    res.sendStatus(500);
  }
});

router.post("/register", async (req, res) => {
  load.start();
  try {
    const { user, password } = req.body;
    const result = await register(user, password);
    if (result.error == undefined) res.send(result);
    else res.send(result.error);
  } catch (err) {
    log(error(err));
    res.sendStatus(500);
  }
  load.stop();
});

module.exports = router;
