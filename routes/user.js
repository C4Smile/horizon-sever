const express = require("express");
const path = require("path");

const { error, log, info, good } = require("../utils/chalk");

// locals
const {
  login,
  saveUser,
  register,
  loadUsers,
  loadUser,
  deleteUser,
  deleteUsers,
  getUserNotifications,
} = require("../controller/user");

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

router.post("/login", async (req, res) => {
  log(info("Logging user"));
  load.start();
  try {
    const { user, password } = req.body;
    const result = await login(user, password);
    load.stop();
    if (result.status === 200) {
      log(good(`${user} logged successful`));
      res.send(result);
    } else if (result.status === 422) {
      log(error(`${user} ${result.error}`));
      res.send(result);
    } else {
      log(error(result.error));
      res.send({ error: result.error });
    }
  } catch (err) {
    load.stop();
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
    const user = req.body.user;
    const result = await register(user);
    if (result.error == undefined) res.send(result);
    else res.send(result.error);
  } catch (err) {
    log(error(err));
    res.sendStatus(500);
  }
  load.stop();
});

router.post("/save", async (req, res) => {
  if (req.headers.authorization) {
    if (req.headers.authorization.indexOf("Bearer ") === 0) {
      const verified = verifyBearer(req.headers.authorization);
      if (verified) {
        log(info("Saving profile"));
        load.start();
        try {
          const { user, create } = req.body;
          const result = await saveUser(user, create);
          load.stop();
          if (result.status === 200) {
            log(good(`${user.user} saved successful`));
            res.send(result);
          } else if (result.status === 422) {
            log(error(`${user.user} ${result.error}`));
            res.send(result);
          } else {
            log(error(result.error));
            res.send({ error: result.error });
          }
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
  res.status(404);
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

router.post("/delete", async (req, res) => {
  if (req.headers.authorization) {
    if (req.headers.authorization.indexOf("Bearer ") === 0) {
      const verified = verifyBearer(req.headers.authorization);
      if (verified) {
        log(info("Deleting user"));
        load.start();
        try {
          const { user } = req.body;
          const result = await deleteUser(user);
          load.stop();
          if (result.status === 200) {
            log(good(`${user} deleted successful`));
            res.send(result);
          } else if (result.status === 422) {
            log(error(`${user} ${result.error}`));
            res.send(result);
          } else {
            log(error(result.error));
            res.send({ error: result.error });
          }
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
  res.status(404);
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

router.post("/delete-many", async (req, res) => {
  if (req.headers.authorization) {
    if (req.headers.authorization.indexOf("Bearer ") === 0) {
      const verified = verifyBearer(req.headers.authorization);
      if (verified) {
        log(info("Deleting users"));
        load.start();
        try {
          const { users } = req.body;
          const result = await deleteUsers(users);
          load.stop();
          if (result.status === 200) {
            log(good(`${users.length} deleted successful`));
            res.send(result);
          } else if (result.status === 422) {
            log(error(`${users.length} ${result.error}`));
            res.send(result);
          } else {
            log(error(result.error));
            res.send({ error: result.error });
          }
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
  res.status(404);
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

module.exports = router;
