// @ts-check
const { Entity } = require("./Entity");

class Ship extends Entity {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {object} price
   * @param {number} life
   * @param {number} speed
   * @param {number} creationTime
   * @param {string[]} req
   */
  constructor(id, name, price, life, speed, creationTime, req) {
    super(id, name, price, creationTime, req);
    this.currentPrice = { ...price };
    this.life = life;
    this.currentLife = life;
    this.speed = speed;
    this.currentSpeed = speed;
    this.req = req;
  }

  createShip(
    options = {
      id: "",
      name: "",
      price: {},
      life: 0,
      speed: 0,
      creationTime: 0,
      req: [],
    }
  ) {
    const { id, name, price, life, speed, creationTime, req } = options;
    this.id = id;
    this.name = name;
    this.price = price;
    this.creationTime = creationTime;
    this.currentPrice = { ...price };
    this.life = life;
    this.currentLife = life;
    this.speed = speed;
    this.currentSpeed = speed;
    this.req = req;
  }

  get CurrentPrice() {
    return this.currentPrice;
  }

  set CurrentPrice(newPrice) {
    this.currentPrice = newPrice;
  }

  get Life() {
    return this.life;
  }

  get CurrentLife() {
    return this.currentLife;
  }

  set CurrentLife(newLife) {
    this.currentLife = newLife;
  }

  get Speed() {
    return this.speed;
  }

  get CurrentSpeed() {
    return this.currentSpeed;
  }

  set CurrentSpeed(newSpeed) {
    this.currentSpeed = newSpeed;
  }
}

module.exports = Ship;
