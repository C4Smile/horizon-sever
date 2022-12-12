// @ts-check

const express = require("express");

const { usersOnline } = require("../chronons/resourcesChronons");

const { log, error } = require("../utils/chalk");

// controller
const {
  getBuildingsFromNation,
  getShipsFromNation,
  getTechnologiesFromNation,
  getNations,
} = require("../controller/nation");
const {
  getBuildings,
  getTechnologies,
  getShips,
} = require("../controller/technologies");

// auth
const { verifyBearer } = require("../utils/secure");

const load = require("../utils/loading");
const {
  userSelectNation,
  userSelectEmail,
  userSelectNick,
} = require("../controller/user");

const router = express.Router();

router.get("/fetch-nations", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { nation, forList } = req.query;
          // @ts-ignore
          const nations = await getNations(nation, forList);
          res.status(200).send({
            data: { nations },
          });
          load.stop();
          return;
        }
      }
    }
    log(error("request of nation unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

router.get("/fetch-all-tech", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { user, forList } = req.query;
          let nation = req.query.nation;
          if (user && !nation) nation = usersOnline[user].nation;
          // @ts-ignore
          const buildings = getBuildingsFromNation(nation, forList);
          // @ts-ignore
          const ships = getShipsFromNation(nation, forList);
          // @ts-ignore
          const technologies = getTechnologiesFromNation(nation, forList);
          res.status(200).send({
            data: { buildings, ships, technologies },
          });
          load.stop();
          return;
        }
      }
    }
    log(error("request of all tech unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

router.get("/fetch-buildings", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { user, forList } = req.query;
          let nation = req.query.nation;
          if (user && !nation) nation = usersOnline[user].nation;
          // @ts-ignore
          const buildings = getBuildingsFromNation(nation, forList);
          res.send({
            data: { buildings },
          });
          load.stop();
          return;
        }
      }
    }
    log(error("request of building unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

router.get("/fetch-technologies", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { user, forList } = req.query;
          let nation = req.query.nation;
          if (user && !nation) nation = usersOnline[user].nation;
          // @ts-ignore
          const technologies = getTechnologiesFromNation(nation, forList);
          res.send({
            data: { technologies },
          });
          load.stop();
          return;
        }
      }
    }
    log(error("request of technologies unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

router.get("/fetch-ships", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { user, forList } = req.query;
          let nation = req.query.nation;
          if (user && !nation) nation = usersOnline[user].nation;
          // @ts-ignore
          const ships = getShipsFromNation(nation, forList);
          res.send({
            data: { ships },
          });
          load.stop();
          return;
        }
      }
    }
    log(error("request of ships unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

router.post("/user-make", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { user, techId, type, noCost, count } = req.body;
          if (noCost) {
            usersOnline[user].addTechnology({ Id: techId, Type: type }, count);
            res.send({ user, techId, noCost, count }).status(200);
          } else {
            // switch type
            // const tech
            if (usersOnline[user].canMake())
              res.send({ user, techId, noCost, count }).status(200);
          }
          load.stop();
          return;
        }
      }
    }
    log(error("request of user-make unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

router.post("/select-nation", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { user, nation } = req.body;
          const result = await userSelectNation(user, nation);
          if (result) res.status(200).send({ data: { nation } });
          else res.status(500).send({ data: { error: "SomeWrong" } });
          load.stop();
          return;
        }
      }
    }
    log(error("request of select-nation unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

router.post("/set-nick", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { user, nick } = req.body;
          const result = await userSelectNick(user, nick);
          if (result) res.status(200).send({ data: { nick } });
          else res.status(500).send({ data: { error: "SomeWrong" } });
          load.stop();
          return;
        }
      }
    }
    log(error("request of set-nick unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

router.post("/set-email", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { user, email } = req.body;
          const result = await userSelectEmail(user, email);
          if (result) res.status(200).send({ data: { email } });
          else res.status(500).send({ data: { error: "SomeWrong" } });
          load.stop();
          return;
        }
      }
    }
    log(error("request of set-email unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

module.exports = router;
