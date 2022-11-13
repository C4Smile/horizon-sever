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
          res.status(200).send({ data: { message: "authorized" } });
          return;
        } catch (err) {
          load.stop();
          log(error(err));
          res.status(500).send({ error: "SomeWrong" });
          return;
        }
      }
    }
  }
  res.status(401).send({ error: "NeedRestart" });
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
        break;
      default:
        log(error(result.error));
        break;
    }
    res.status(result.status).send(result);
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
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
        break;
      }
      default:
        log(error(result.error));
        break;
    }
    res.status(result.status).send(result);
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

router.get("/list", async (req, res) => {
  try {
    load.start();
    const result = await loadUsers();
    res.status(result.status).send(result);
    load.stop();
  } catch (err) {
    load.stop();
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
});

router.get("/notifications", async (req, res) => {
  try {
    load.start();
    const user = req.query.user;
    const result = await getUserNotifications(user);
    res.status(result.status).send(result);
    load.stop();
  } catch (err) {
    load.stop();
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
});

router.post("/get", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { id, attributes } = req.body;
          const result = await loadUser(id, attributes);
          res.status(result.status).send(result);
          load.stop();
          return;
        }
      }
    }
    log(error("request of nation unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    load.stop();
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
});

router.post("/register", async (req, res) => {
  load.start();
  try {
    const { user, password } = req.body;
    const result = await register(user, password);
    res.status(result.status).send(result);
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

module.exports = router;
