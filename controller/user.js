// @ts-check

const uuid = require("node-uuid");

const { insert, getValue, update, getTable, setTable } = require("../db/local");

const { keys } = require("../utils/secure");

const giveToken = () => {
  const date = new Date();
  const stringDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return stringDate;
};

/**
 *
 * @param {string} user
 * @returns
 */
const getUserNotifications = async (user) => {
  try {
    const data = await getValue("users", user.toLowerCase());
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
    const data = await getValue("users", user.toLowerCase());
    if (data) {
      const { name, password, theme, role, photo, email } = data;
      if (pPassword.toLowerCase() === password.toLowerCase()) {
        const token = uuid.v4();
        // @ts-ignore
        keys.push(token);
        return {
          status: 200,
          data: {
            name,
            role: role || "superadmin",
            theme,
            email,
            photo,
            token,
            expiration: giveToken(),
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
 * @param {object} notification
 */
const addNotification = async (user, notification) => {
  try {
    let userData = await getValue("users", user.toLowerCase());
    if (userData) {
      const { content, title } = notification;
      const date = new Date();
      userData.notifications.push({ content, title, date: date.getTime() });
      await update("users", user.toLowerCase(), userData);
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

/**
 *
 * @param {object} user { user, name, password, photo, email, role, theme}
 * @param {boolean} create if it's for create a new user
 * @returns user data
 */
const saveUser = async (user, create) => {
  try {
    if (create) {
      await insert("users", user.user.toLocaleLowerCase(), user);
      // return without password
      user.password = "";
      return {
        status: 200,
        data: {
          ...user,
        },
      };
    } else {
      let userData = await getValue("users", user.user.toLowerCase());
      if (userData) {
        if (user.password === "") user.password = userData.password;
        await update("users", user.user.toLocaleLowerCase(), user);
        // return without password
        user.password = "";
        return {
          status: 200,
          data: {
            ...user,
          },
        };
      }
    }
    return { status: 422, error: "not found" };
  } catch (err) {
    return { status: 500, error: String(err) };
  }
};

/**
 *
 * @param {string} user
 */
const deleteUser = async (user) => {
  try {
    const data = await getTable("users");
    if (data && data.length)
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].id === user) delete data[i];
        await setTable("users", data);
        return { status: 200, data: "deleted" };
      }
    return { status: 422, error: "not found" };
  } catch (error) {
    return { status: 500, error: String(error) };
  }
};

/**
 *
 * @param {string[]} users
 * @returns 204 if there is nothing to delete, 200 if deleted successfully
 */
const deleteUsers = async (users) => {
  if (!users.length) return { status: 204, message: "nothing to delete" };
  try {
    const data = await getTable("users");
    if (data) {
      users.forEach((item) => {
        delete data[item];
      });
      await setTable("users", data);
      return { status: 200, message: "deleted" };
    }
    return { status: 422, error: "not found" };
  } catch (error) {
    return { status: 500, error: String(error) };
  }
};

const loadUsers = async () => {
  try {
    const data = await getTable("users");
    if (data) {
      const parsedData = [];
      Object.values(data).map((item) => {
        const { user, name, role, email } = item;
        parsedData.push({ id: user, name, role, email });
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
 * @param {object} user
 * @returns user data
 */
const register = async (user) => {
  try {
    const data = await getValue("users", user.name.toLowerCase());
    if (data === undefined) {
      await insert("users", user.name.toLowerCase(), { ...user });
      const token = uuid.v4();
      // @ts-ignore
      keys.push(token);
      return {
        status: 200,
        data: {
          ...user,
          token,
          expiration: giveToken(),
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
  getUserNotifications,
  addNotification,
  saveUser,
  register,
  loadUsers,
  deleteUser,
  deleteUsers,
};
