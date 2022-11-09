// @ts-check

const { insert, getValue, update, getTable } = require("../db/local");

/**
 *
 * @param {string} id
 * @returns
 */
const getUser = async (id) => {
  try {
    const data = await getValue("user", id);
    if (data) return data;
    return undefined;
  } catch (err) {
    return err;
  }
};

/**
 *
 * @param {string} user
 * @returns
 */
const getUserByUser = async (user) => {
  try {
    const data = await getTable("user");
    if (data)
      for (const item of Object.values(data))
        if (item.user === user) return item;
    return undefined;
  } catch (err) {
    return err;
  }
};

/**
 *
 * @param {object} remoteData
 */
const updateUser = async (remoteData) => {
  try {
    const data = await update("user", remoteData.id, remoteData);
    if (data) return "exist";
    else {
      await insert("user", remoteData.id, remoteData);
      return data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 *
 * @param {object} condition
 * @param {object} toFetch
 * @return
 */
const getUsers = async (condition = {}, toFetch = {}) => {
  try {
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
    }
    return undefined;
  } catch (err) {
    return err;
  }
};

/**
 *
 * @param {string} user
 * @param {string} password
 */
const createUser = async (user, password) => {
  try {
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
  } catch (err) {
    return err;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserByUser,
  updateUser,
  getUsers,
};
