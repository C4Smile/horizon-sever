// @ts-check

const { insert, getValue, update, getTable } = require("../db/local");

/**
 *
 * @param {string} id
 * @returns
 */
const getUser = async (id) => {
  const data = await getValue("user", id);
  if (data) return data;
  return undefined;
};

/**
 *
 * @param {string} user
 * @returns
 */
const getUserByUser = async (user) => {
  const data = await getTable("user");
  if (data)
    for (const item of Object.values(data)) if (item.user === user) return item;
  return undefined;
};

/**
 *
 * @param {string} user
 * @param {string} nation
 */
const userSelectNation = async (user, nation) => {
  const data = await getUser(user);
  if (data) {
    data.nation = nation;
    await update("user", user, data);
    return 200;
  } else return undefined;
};

/**
 *
 * @param {string} user
 * @param {string} nick
 */
const userSelectNick = async (user, nick) => {
  const data = await getUser(user);
  if (data) {
    data.nick = nick;
    await update("user", user, data);
    return 200;
  } else return undefined;
};

/**
 *
 * @param {string} user
 * @param {string} email
 */
const userSelectEmail = async (user, email) => {
  const data = await getUser(user);
  if (data) {
    data.email = email;
    await update("user", user, email);
    return 200;
  } else return undefined;
};

/**
 *
 * @param {object} remoteData
 */
const updateUser = async (remoteData) => {
  const data = await update("user", remoteData.id, remoteData);
  if (data) return "exist";
  else {
    await insert("user", remoteData.id, remoteData);
    return data;
  }
};

/**
 *
 * @param {object} condition
 * @param {object} toFetch
 * @return
 */
const getUsers = async (condition = {}, toFetch = {}) => {
  const data = await getTable("user");
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
 * @param {string} user
 * @param {string} password
 */
const createUser = async (user, password) => {
  const data = await getUserByUser(user);
  if (data) return "exist";
  else {
    const id = Buffer.from(user).toString("base64");
    await insert("user", id, {
      id,
      user: user.split("@")[0],
      email: user,
      state: 1,
      lastOnline: 0,
      password,
    });
    return data;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserByUser,
  updateUser,
  getUsers,
  userSelectNation,
  userSelectNick,
  userSelectEmail,
};
