/**
 *
 * @param {object} page

 */
function parsePaginationFromQuery(query) {
  const { page, count } = query;
  const parsedPage = page !== undefined ? Number(page) : 0;
  const parsedCount = count !== undefined ? Number(count) : 10;
  const data = { page: parsedPage, count: parsedCount };
  return data;
}

module.exports = { parsePaginationFromQuery };
