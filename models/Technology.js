// @ts-check
const { Entity } = require("./Entity");

class Technology extends Entity {
  /**
   * @param {string} id
   * @param {string} name
   * @param {object} price
   * @param {number} creationTime
   * @param {string[]} req
   */
  constructor(id, name, price, creationTime, req) {
    super(id, name, price, creationTime, req);
    this.currentPrice = { ...price };
    this.id = id;
    this.name = name;
    this.req = req;
  }

  /**
   *
   * @param {object} options
   */
  createTechnology(
    options = { id: "", name: "", price: {}, creationTime: 0, req: [] }
  ) {
    const { id, name, price, creationTime, req } = options;
    this.id = id;
    this.name = name;
    this.price = price;
    this.creationTime = creationTime;
    this.currentPrice = { ...price };
    this.req = req;
  }
}

module.exports = Technology;
