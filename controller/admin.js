// @ts-check

// driver
const { insert } = require("../db/template");

const { error, log, info } = require("../utils/chalk");

/**
 *
 * @param {array} buildings
 */
const addBuildings = async (buildings) => {
  try {
    log(info(`adding new buildings`));
    for (const item of buildings) {
      log(info(`saving building ${item.name}`));
      const id = Buffer.from(item.name).toString("base64");
      await insert("building", id, { ...item, id });
    }
  } catch (err) {
    log(error(err));
  }
};

/**
 *
 * @param {array} ships
 */
const addShips = async (ships) => {
  try {
    log(info(`adding new ships`));
    for (const item of ships) {
      log(info(`saving ship ${item.name}`));
      const id = Buffer.from(item.name).toString("base64");
      await insert("ship", id, { ...item, id });
    }
  } catch (err) {
    log(error(err));
  }
};

/**
 *
 * @param {array} technologies
 */
const addTechnologies = async (technologies) => {
  try {
    log(info(`adding new technologies`));
    for (const item of technologies) {
      log(info(`saving technology ${item.name}`));
      const id = Buffer.from(item.name).toString("base64");
      await insert("technology", id, { ...item, id });
    }
  } catch (err) {
    log(error(err));
  }
};

/**
 *
 * @param {array} heros
 */
const addHeros = async (heros) => {
  try {
    log(info(`adding new heros`));
    for (const item of heros) {
      log(info(`saving hero ${item.name}`));
      const id = Buffer.from(item.name).toString("base64");
      await insert("hero", id, { ...item, id });
    }
  } catch (err) {
    log(error(err));
  }
};

module.exports = {
  addBuildings,
  addShips,
  addTechnologies,
  addHeros,
};
