// @ts-check

const { insert, getValue, getTable } = require("../db/local");

/**
 *
 * @param {string} id
 * @returns
 */
const getBattle = async (id) => {
  const data = await getValue("battle", id);
  if (data) return data;
  return undefined;
};

/**
 *
 * @param {string} user
 * @returns
 */
const getBattlesByUser = async (user) => {
  const data = await getTable("battle");
  if (data)
    for (const item of Object.values(data))
      if (item.users.find((jtem) => jtem.user === user)) return item;
  return undefined;
};

/**
 *
 * @param {object} condition
 * @param {object} toFetch
 * @return
 */
const getBattles = async (condition = {}, toFetch = {}) => {
  const data = await getTable("battle");
  if (data) {
    const toReturn = [];
    Object.values(data).forEach((item) => {
      let itsOk = true;
      for (const jtem of Object.keys(condition))
        if (item[jtem] !== condition[jtem]) {
          itsOk = false;
          break;
        }
      if (itsOk) {
        const parsedItem = {};
        Object.keys(toFetch).forEach((jtem) => {
          parsedItem[jtem] = item[jtem];
        });
        toReturn.push(parsedItem);
      }
    });
    return toReturn;
  }
  return undefined;
};

/**
 *
 */
const createBattle = async (team1, team2) => {
  
};

module.exports = {
  createBattle,
  getBattle,
  getBattlesByUser,
  getBattles,
};
