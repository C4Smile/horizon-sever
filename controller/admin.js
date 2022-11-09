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
 * @param {array} units
 */
const addUnits = async (units) => {
  try {
    log(info(`adding new units`));
    for (const item of units) {
      log(info(`saving unit ${item.name}`));
      const id = Buffer.from(item.name).toString("base64");
      await insert("unit", id, { ...item, id });
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
  addUnits,
  addTechnologies,
  addHeros,
};
