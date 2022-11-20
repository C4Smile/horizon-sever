const loopOnChat = (data, receiver, page, count) => {
  const keys = Object.keys(data);
  const dataAsArray = Object.values(data).map((item) => item.reverse());
  const parsedData = [];
  const parsedPage = Number(page) || 1;
  const parsedCount = count || 10;
  const limit =
    parsedCount === -1 ? dataAsArray.length : parsedPage * parsedCount;
  for (let i = limit - parsedCount; i < limit; i += 1) {
    if (i >= dataAsArray.length) break;
    if (keys[i].indexOf(receiver) >= 0)
      if (dataAsArray[i].length) {
        let unread = dataAsArray.filter((item) => !item.read).length;
        parsedData.push({ ...dataAsArray[i][0], unread });
      }
  }
  const totalPages = Math.floor(data.length / parsedCount) || 1;
  return { parsedData, parsedCount, totalPages };
};

module.exports = {
  loopOnChat,
};
