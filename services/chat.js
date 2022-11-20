// @ts-check

const {
  getChat,
  getChats,
  createChat,
  updateChat,
} = require("../controller/chat");

const { loopOnChat } = require("../controller/loop");

/**
 *
 * @param {string} aReceiver
 * @param {number} page
 * @param {number} count
 * @returns
 */
const loadChatsByReceiver = async (aReceiver, page = 1, count = 30) => {
  const data = await getChats();
  if (data) {
    const { parsedPage, parsedData, totalPages } = loopOnChat(
      data,
      aReceiver,
      page,
      count
    );
    return {
      status: 200,
      page: parsedPage,
      list: parsedData,
      totalPages: count === -1 ? 1 : totalPages,
    };
  }
  return { status: 422, error: "SomeWrong" };
};

/**
 *
 * @param {string} id
 * @param {number} page
 * @param {number} count
 * @returns
 */
const loadChat = async (id, page = 0, count = 30) => {
  const data = (await getChat(id))?.reverse();
  if (data) {
    const messages = [];
    const parsedPage = Number(page) || 1;
    const parsedCount = count || 10;
    const limit = parsedCount === -1 ? data.length : parsedPage * parsedCount;
    for (let i = limit - parsedCount; i < limit; i += 1) {
      if (i >= data.length) break;
      messages.push(data[i]);
    }
    const totalPages = Math.floor(data.length / parsedCount) || 1;
    return {
      status: 200,
      page: parsedPage,
      list: messages,
      totalPages: count === -1 ? 1 : totalPages,
    };
  }
  return { status: 422, error: "SomeWrong" };
};

module.exports = {
  loadChat,
  loadChatsByReceiver,
};
