// @ts-check
var JSONMGR = require("json-manager");
var json = new JSONMGR({
  dir: "./db",
  target: "db.json",
  watch: true,
  autoSave: true,
});

json.init();

/**
 * @param {string} table
 * @param {string} key
 * @param {any} value
 */
const insert = async (table, key, value) => {
  let localTable = json.get(table);
  if (localTable) localTable[key] = value;
  else {
    localTable = {};
    localTable[key] = value;
  }
  json.set(table, localTable);
  json.save();
  return { ...value };
};

/**
 * @param {string} table
 * @param {string} key
 * @param {any} value
 */
const update = async (table, key, value) => {
  let localTable = json.get(table);
  if (localTable) localTable[key] = value;
  else {
    localTable = {};
    localTable[key] = value;
  }
  json.set(table, localTable);
  json.save();
  return { ...value };
};

/**
 * @param {string} table
 * @param {string} key
 */
const getValue = async (table, key) => {
  const localTable = json.get(table);
  if (localTable) return json.get(table)[key];
  return undefined;
};

/**
 * @param {string} table
 */
const getTable = async (table) => {
  const localTable = json.get(table);
  if (localTable) return json.get(table);
  return {};
};

/**
 *
 * @param {string} table
 * @param {object} newValue
 */
const setTable = async (table, newValue) => {
  const localTable = json.get(table);
  if (localTable) json.set(table, newValue);
  return true;
};

module.exports = {
  insert,
  getValue,
  getTable,
  setTable,
  update,
};
