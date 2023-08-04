const config = require("./config");
const { connection } = require("sito-node-mysql/connection");
const { insert } = require("sito-node-mysql");

// templates
const es = require("./db/templateES.json");

const main = async () => {
  connection.init(config);

  const tick = new Date().getTime();
  const objects = Object.values(es.nation);
  for (const nation of objects) {
    const id = await insert(["nations"], ["id", "date", "name"], {
      name: nation.name,
      date: new Date().getTime(),
    });
    console.info("SAVED", id);
  }
  const tock = new Date().getTime();
  console.info("OPERATION DONE! TOOK", tock - tick, "MILLISECONDS");
};

main();
