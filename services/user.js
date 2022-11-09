// @ts-check

const uuid = require("node-uuid");
const { usersOnline } = require("../chronons/resourcesChronons");
const {
  getUser,
  getUserByUser,
  getUsers,
  createUser,
  updateUser,
} = require("../controller/user");

const { keys } = require("../utils/secure");
const { UserStatusEnum, User } = require("../models/User");

const giveToken = () => {
  const date = new Date();
  // date.setHours(date.getHours() + 1);
  date.setSeconds(date.getSeconds() + 20);
  const stringDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return { string: stringDate, number: date.getTime() };
};

/**
 *
 * @param {string} user
 * @returns
 */
const getUserNotifications = async (user) => {
  try {
    const data = await getUser(user.toLowerCase());
    if (data) {
      const { notifications } = data;
      return {
        status: 200,
        data: {
          notifications,
        },
      };
    }
    return { status: 422, error: "not found" };
  } catch (error) {
    return { status: 500, error: String(error) };
  }
};

/**
 *
 * @param {string} user
 * @param {string} pPassword
 * @returns user data
 */
const login = async (user, pPassword) => {
  try {
    const data = await getUserByUser(user.toLowerCase());
    if (data) {
      const { id, password } = data;
      if (pPassword.toLowerCase() === password.toLowerCase()) {
        await updateUser({ ...data, state: UserStatusEnum.Online });
        usersOnline[data.id] = new User();
        usersOnline[data.id].createUser({ ...data });
        const token = uuid.v4();
        const expiration = giveToken();
        // @ts-ignore
        keys[id] = { token, time: expiration.number };
        return {
          status: 200,
          data: {
            id,
            token,
            expiration: expiration.string,
          },
        };
      } else return { status: 422, error: "wrong password" };
    }
    return { status: 422, error: "not found" };
  } catch (error) {
    return { status: 500, error: String(error) };
  }
};

/**
 *
 * @param {string} user
 * @returns
 */
const logOut = async (user) => {
  try {
    const data = await getUser(user);
    if (data) {
      await updateUser({
        ...data,
        state: UserStatusEnum.Offline,
        lastOnline: new Date().getTime(),
      });
      delete keys[user];
      delete usersOnline[user];
      return {
        status: 200,
        data: {
          user,
        },
      };
    }
    return { status: 422, error: "not found" };
  } catch (error) {
    return { status: 500, error: String(error) };
  }
};

/**
 *
 * @param {string} user
 * @param {object} notification
 */
const addNotification = async (user, notification) => {
  try {
    let userData = await getUser(user.toLowerCase());
    if (userData) {
      const { content, title } = notification;
      const date = new Date();
      userData.notifications.push({ content, title, date: date.getTime() });
      await updateUser(userData);
      return {
        status: 200,
        data: {
          user,
          notification,
        },
      };
    }
    return { status: 422, error: "not found" };
  } catch (err) {
    return { status: 500, error: String(err) };
  }
};

const loadUsers = async () => {
  try {
    const data = await getUsers();
    if (data) {
      const parsedData = [];
      Object.values(data).map((item) => {
        const { id, user, nick, role, email } = item;
        parsedData.push({ id, user, nick, role, email });
      });
      return { status: 200, data: parsedData };
    }
    return { status: 422, error: "not found" };
  } catch (error) {
    return { status: 500, error: String(error) };
  }
};

/**
 *
 * @param {string} user
 * @param {string} password
 * @returns user data
 */
const register = async (user, password) => {
  try {
    const data = await createUser(user, password);
    if (data === undefined) {
      const token = uuid.v4();
      // @ts-ignore
      const id = Buffer.from(user).toString("base64");
      const expiration = giveToken();
      keys[id] = { token, time: expiration.number };
      return {
        status: 200,
        data: {
          id,
          token,
          expiration: expiration.string,
        },
      };
    }
    return { status: 422, error: "username taken" };
  } catch (err) {
    return { status: 500, error: String(err) };
  }
};

module.exports = {
  login,
  logOut,
  getUserNotifications,
  addNotification,
  register,
  loadUsers,
};
