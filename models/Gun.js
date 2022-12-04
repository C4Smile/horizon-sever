// @ts--check

const { Entity } = require("./Entity");

class Gun extends Entity {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {string} description
   * @param {number} damage
   * @param {number} weight
   * @param {object} price
   * @param {string[]} req
   */
  constructor(
    id = "",
    name = "",
    damage = 0,
    description = "",
    weight = 0,
    price = {},
    req = []
  ) {
    super(id, name, description, price, 0, req);
    this.req = req;
    this.weight = weight;
    this.damage = damage;
    this.currentDamage = damage;
    this.description = description;
    this.currentPrice = { ...price };
  }

  createGun(
    options = {
      id: "",
      name: "",
      description: "",
      price: {},
      damage: 0,
      weight: 0,
      creationTime: 0,
      req: [],
    }
  ) {
    const { id, name, description, price, damage, weight, creationTime, req } =
      options;
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.creationTime = creationTime;
    this.currentPrice = { ...price };
    this.weight = weight;
    this.damage = damage;
    this.currentDamage = damage;
    this.req = req;
  }

  get CurrentPrice() {
    return this.currentPrice;
  }

  set CurrentPrice(newPrice) {
    this.currentPrice = newPrice;
  }

  get Weight() {
    return this.weight;
  }

  get Damage() {
    return this.damage;
  }

  get CurrentDamage() {
    return this.currentDamage;
  }

  set CurrentDamage(newDamage) {
    this.currentDamage = newDamage;
  }
}

module.exports = { Gun };
