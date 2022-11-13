// @ts-check

// driver
const { insert } = require("../db/template");

const { log, info, good } = require("../utils/chalk");

/**
 *
 * @param {array} buildings
 */
const addBuildings = async (buildings) => {
  log(info(`adding ${buildings.length} new buildings`));
  for (const item of buildings) {
    log(info(`saving building ${item.name}`));
    const id = Buffer.from(item.name).toString("base64");
    await insert("building", id, { ...item, id });
  }
  log(good(`added ${buildings.length} new buildings successfully`));
};

/**
 *
 * @param {array} ships
 */
const addShips = async (ships) => {
  log(info(`adding ${ships} new ships`));
  for (const item of ships) {
    log(info(`saving ship ${item.name}`));
    const id = Buffer.from(item.name).toString("base64");
    await insert("ship", id, { ...item, id });
  }
  log(good(`added ${ships.length} new buildings successfully`));
};

/**
 *
 * @param {array} technologies
 */
const addTechnologies = async (technologies) => {
  log(info(`adding ${technologies.length} new technologies`));
  for (const item of technologies) {
    log(info(`saving technology ${item.name}`));
    const id = Buffer.from(item.name).toString("base64");
    await insert("technology", id, { ...item, id });
  }
  log(good(`added ${technologies.length} new buildings successfully`));
};

module.exports = {
  addBuildings,
  addShips,
  addTechnologies,
};
