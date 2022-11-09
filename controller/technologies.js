// @ts-check

const { getValue, getTable } = require("../db/template");

const { error, log, info } = require("../utils/chalk");

/**
 *
 * @param {string} building
 * @param {boolean} forList
 */
const getBuildings = async (building, forList) => {
  try {
    if (building) {
      log(info(`fetching information of building ${building}`));
      const buildingData = await getValue("building", building);
      return buildingData;
    } else {
      log(info("fetching information of buildings"));
      const buildings = await getTable("building");
      if (buildings)
        return forList
          ? buildings.map((item) => ({ id: item.id, name: item.name }))
          : buildings;
    }
  } catch (err) {
    log(error(err));
  }
};

/**
 *
 * @param {string} ship
 * @param {boolean} forList
 */
const getShips = async (ship, forList) => {
  try {
    if (ship) {
      log(info(`fetching information of ship ${ship}`));
      const shipData = await getValue("ship", ship);
      return shipData;
    } else {
      log(info("fetching information of ships"));
      const ships = await getTable("ship");
      if (ships)
        return forList
          ? ships.map((item) => ({ id: item.id, name: item.name }))
          : ships;
    }
  } catch (err) {
    log(error(err));
  }
};

/**
 *
 * @param {string} technology
 * @param {boolean} forList
 */
const getTechnologies = async (technology, forList) => {
  try {
    if (technology) {
      log(info(`fetching information of technology ${technology}`));
      const technologyData = await getValue("technology", technology);
      return technologyData;
    } else {
      log(info("fetching information of technologies"));
      const technologies = await getTable("technology");
      if (technologies)
        return forList
          ? technologies.map((item) => ({ id: item.id, name: item.name }))
          : technologies;
    }
  } catch (err) {
    log(error(err));
  }
};

module.exports = {
  getBuildings,
  getShips,
  getTechnologies,
};
