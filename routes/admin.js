const express = require("express");

// controller
const {
  addBuildings,
  addTechnologies,
  addShips,
} = require("../controller/technologies");

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
    res.send({ status: 403, data: { error: "unauthorized" } }).status(403);
  } catch (err) {
    res.send({ err }).status(500);
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
          res
            .send({
              status: 200,
              data: { ships },
            })
            .status(200);
          load.stop();
          return;
        }
      }
    }
    res.send({ status: 403, data: { error: "unauthorized" } }).status(200);
  } catch (err) {
    res.send({ err }).status(500);
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
    res.send({ status: 403, data: { error: "unauthorized" } }).status(200);
  } catch (err) {
    res.send({ err }).status(500);
  }
  load.stop();
});

module.exports = router;
