// @ts-check
const { log, error } = require("../utils/chalk");

const express = require("express");

// controller
const {
  addBuildings,
  addTechnologies,
  addShips,
} = require("../controller/admin");

// auth
const { verifyBearer } = require("../utils/secure");

const load = require("../utils/loading");

const router = express.Router();

router.post("/add-buildings", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { buildings } = req.body;
          await addBuildings(buildings);
          res.status(200).send({
            data: { buildings },
          });
          load.stop();
          return;
        }
      }
    }
    log(error("request of add-buildings unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

router.post("/add-ships", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { ships } = req.body;
          await addShips(ships);
          res.status(200).send({
            data: { ships },
          });
          load.stop();
          return;
        }
      }
    }
    log(error("request of add-buildings unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

router.post("/add-technologies", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { technologies } = req.body;
          await addTechnologies(technologies);
          res.status(200).send({
            data: { technologies },
          });
          load.stop();
          return;
        }
      }
    }
    log(error("request of add-buildings unauthorized"));
    res.status(401).send({ error: "unauthorized" });
  } catch (err) {
    log(error(err));
    res.status(500).send({ error: "SomeWrong" });
  }
  load.stop();
});

module.exports = router;
