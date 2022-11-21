// @ts-check

const { insert, getValue, update, getTable } = require("../db/local");

/**
 *
 * @param {string} id
 * @returns
 */
const getChat = async (id) => {
  const data = await getValue("chat", id);
  if (data) return data;
  await insert("chat", id, []);
  return [];
};

/**
 *
 * @returns
 */
const getChats = async () => {
  const data = await getTable("chat");
  if (data) return data;
  return undefined;
};

/**
 *
 * @param {object} remoteChat
 */
const updateChat = async (remoteChat) => {
  try {
    const data = await update("chat", remoteChat.id, remoteChat);
    if (data) return "exist";
    else {
      await insert("chat", remoteChat.id, remoteChat);
      return data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 *
 * @param {string} receiver
 * @param {string} sender
 * @param {object} firsMessage
 */
const createChat = async (receiver, sender, firsMessage = undefined) => {
  try {
    const id = Buffer.from(`${receiver}[!]${sender}`).toString("base64");
    const data = await getChat(id);
    if (data) return "exist";
    else {
      await insert("chat", id, firsMessage ? [firsMessage] : []);
      return data;
    }
  } catch (err) {
    return err;
  }
};

module.exports = {
  getChat,
  getChats,
  updateChat,
  createChat,
};
