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
 * @param {string} unit
 * @param {boolean} forList
 */
const getUnits = async (unit, forList) => {
  try {
    if (unit) {
      log(info(`fetching information of unit ${unit}`));
      const unitData = await getValue("unit", unit);
      return unitData;
    } else {
      log(info("fetching information of units"));
      const units = await getTable("unit");
      if (units)
        return forList
          ? units.map((item) => ({ id: item.id, name: item.name }))
          : units;
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

/**
 *
 * @param {string} hero
 * @param {boolean} forList
 */
const getHeros = async (hero, forList) => {
  try {
    if (hero) {
      log(info(`fetching information of hero ${hero}`));
      const heroData = await getValue("hero", hero);
      return heroData;
    } else {
      log(info("fetching information of heros"));
      const heros = await getTable("hero");
      if (heros)
        return forList
          ? heros.map((item) => ({ id: item.id, name: item.name }))
          : heros;
    }
  } catch (err) {
    log(error(err));
  }
};

module.exports = {
  getBuildings,
  getUnits,
  getTechnologies,
  getHeros,
};
