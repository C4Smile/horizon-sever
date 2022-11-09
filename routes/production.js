const express = require("express");

const { usersOnline } = require("../chronons/resourcesChronons");

// controller
const {
  getBuildingsFromNation,
  getUnitsFromNation,
  getTechnologiesFromNation,
  getHerosFromNation,
} = require("../controller/nation");
const {
  getHeros,
  getBuildings,
  getTechnologies,
  getUnits,
} = require("../controller/technologies");

// auth
const { verifyBearer } = require("../utils/secure");

const load = require("../utils/loading");

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
          const units = getUnitsFromNation(nation, forList);
          const technologies = getTechnologiesFromNation(nation, forList);
          const heros = getHerosFromNation(nation, forList);
          res.send({
            status: 200,
            data: { buildings, units, technologies, heros },
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

router.get("/fetch-units", async (req, res) => {
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

router.get("/fetch-heros", async (req, res) => {
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
    res.send({ err }).status(500);
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

module.exports = router;
