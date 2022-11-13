const keys = {};

const verifyBearer = (auth) => {
  console.log(keys, auth);
  const credentials = auth.split(" ")[1];
  if (Object.values(keys).find((item) => item.token.indexOf(credentials) > -1))
    return true;
  return false;
};

module.exports = {
  verifyBearer,
  keys,
};
