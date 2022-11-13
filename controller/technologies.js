// @ts-check

const { getValue, getTable } = require("../db/template");

const { log, info, good } = require("../utils/chalk");

/**
 *
 * @param {string} building
 * @param {boolean} forList
 */
const getBuildings = async (building, forList) => {
  if (building) {
    log(info(`fetching information of building ${building}`));
    const buildingData = await getValue("building", building);
    log(good(`${building} fetched successfully`));
    return buildingData;
  } else {
    log(info("fetching information of buildings"));
    const buildings = await getTable("building");
    if (buildings) {
      log(good(`${buildings.length} buildings fetched successfully`));
      return forList
        ? buildings.map((item) => ({ id: item.id, name: item.name }))
        : buildings;
    }
  }
};

/**
 *
 * @param {string} ship
 * @param {boolean} forList
 */
const getShips = async (ship, forList) => {
  if (ship) {
    log(info(`fetching information of ship ${ship}`));
    const shipData = await getValue("ship", ship);
    log(good(`${ship} ship fetched successfully`));
    return shipData;
  } else {
    log(info("fetching information of ships"));
    const ships = await getTable("ship");
    if (ships) {
      log(good(`${ships.length} ships fetched successfully`));
      return forList
        ? ships.map((item) => ({ id: item.id, name: item.name }))
        : ships;
    }
  }
};

/**
 *
 * @param {string} technology
 * @param {boolean} forList
 */
const getTechnologies = async (technology, forList) => {
  if (technology) {
    log(info(`fetching information of technology ${technology}`));
    const technologyData = await getValue("technology", technology);
    log(good(`${technology} technology fetched successfully`));
    return technologyData;
  } else {
    log(info("fetching information of technologies"));
    const technologies = await getTable("technology");
    if (technologies) {
      log(good(`${technologies.length} technologies fetched successfully`));
      return forList
        ? technologies.map((item) => ({ id: item.id, name: item.name }))
        : technologies;
    }
  }
};

module.exports = {
  getBuildings,
  getShips,
  getTechnologies,
};
