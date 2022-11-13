const express = require("express");

const { usersOnline } = require("../chronons/resourcesChronons");

// controller
const {
  getBuildingsFromNation,
  getShipsFromNation,
  getTechnologiesFromNation,
} = require("../controller/nation");
const {
  getBuildings,
  getTechnologies,
  getShips,
} = require("../controller/technologies");

// auth
const { verifyBearer } = require("../utils/secure");

const load = require("../utils/loading");
const { userSelectNation } = require("../controller/user");

const router = express.Router();

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
          const buildings = getBuildingsFromNation(nation, forList);
          const ships = getShipsFromNation(nation, forList);
          const technologies = getTechnologiesFromNation(nation, forList);
          const heros = getHerosFromNation(nation, forList);
          res.send({
            status: 200,
            data: { buildings, ships, technologies, heros },
          });
          load.stop();
          return;
        }
      }
    }
    res.send({ status: 403, error: "unauthorized" });
  } catch (err) {
    res.send({ err }).status(500);
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
          const buildings = getBuildingsFromNation(nation, forList);
          res
            .send({
              status: 200,
              data: { buildings },
            })
            .status(200);
          load.stop();
          return;
        }
      }
    }
    res.send({ status: 403, data: { error: "unauthorized" } });
  } catch (err) {
    res.send({ err }).status(500);
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
          const technologies = getTechnologiesFromNation(nation, forList);
          res
            .send({
              status: 200,
              data: { technologies },
            })
            .status(200);
          load.stop();
          return;
        }
      }
    }
    res.send({ status: 403, data: { error: "unauthorized" } });
  } catch (err) {
    res.send({ err }).status(500);
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
          const { nation } = req.query;
          load.stop();
          return;
        }
      }
    }
    res.send({ status: 403, data: { error: "unauthorized" } });
  } catch (err) {
    res.send({ err }).status();
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
          if (noCost)
            usersOnline[user].addTechnology({ Id: techId, Type: type }, count);
          else {
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
    res.send({ status: 403, data: { error: "unauthorized" } });
  } catch (err) {
    res.send({ err }).status(500);
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
          if (result) res.send({ status: 200, data: { nation } });
          else res.send({ status: 403, data: { error: "unauthorized" } });
          load.stop();
          return;
        }
      }
    }
    res.send({ status: 403, data: { error: "unauthorized" } });
  } catch (err) {
    res.send({ err }).status(500);
  }
  load.stop();
});

module.exports = router;
