// @ts-check
const { Entity } = require("./Entity");
const { Guns } = require("./Guns");

class Ship extends Entity {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {object} price
   * @param {number} durability
   * @param {number} speed
   * @param {number} crew
   * @param {number} cargo
   * @param {Guns[]} guns
   * @param {number} creationTime
   * @param {string[]} req
   */
  constructor(
    id,
    name,
    price,
    durability,
    speed,
    crew,
    cargo,
    creationTime,
    guns,
    req
  ) {
    super(id, name, price, creationTime, req);
    this.currentPrice = { ...price };
    this.durability = durability;
    this.currentDurability = durability;
    this.speed = speed;
    this.currentSpeed = speed;
    this.crew = crew;
    this.currentCrew = crew;
    this.cargo = cargo;
    this.currentCargo = cargo;
    this.guns = guns;
    this.shipType = name;
    this.req = req;
  }

  createShip(
    options = {
      id: "",
      name: "",
      price: {},
      durability: 0,
      speed: 0,
      crew: 0,
      cargo: 0,
      guns: [],
      type: "",
      creationTime: 0,
      req: [],
    }
  ) {
    const {
      id,
      name,
      price,
      durability,
      speed,
      creationTime,
      crew,
      cargo,
      guns,
      req,
    } = options;
    this.id = id;
    this.name = name;
    this.price = price;
    this.creationTime = creationTime;
    this.currentPrice = { ...price };
    this.durability = durability;
    this.currentDurability = durability;
    this.speed = speed;
    this.currentSpeed = speed;
    this.crew = crew;
    this.currentCrew = crew;
    this.cargo = cargo;
    this.currentCargo = cargo;
    this.guns = guns;
    this.shipType = name;
    this.req = req;
  }

  set Name(newName) {
    this.name = newName;
  }

  get CurrentPrice() {
    return this.currentPrice;
  }

  set CurrentPrice(newPrice) {
    this.currentPrice = newPrice;
  }

  get Life() {
    return this.durability;
  }

  get CurrentLife() {
    return this.currentDurability;
  }

  set CurrentLife(newLife) {
    this.currentDurability = newLife;
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

  get Crew() {
    return this.crew;
  }

  get CurrentCrew() {
    return this.currentCrew;
  }

  set CurrentCrew(newCrew) {
    this.currentCrew = newCrew;
  }

  get Cargo() {
    return this.cargo;
  }

  get CurrentCargo() {
    return this.currentCargo;
  }

  set CurrentCargo(newCargo) {
    this.currentCargo = newCargo;
  }

  get Guns() {
    return this.guns;
  }

  set Guns(newGuns) {
    this.guns = newGuns;
  }

  get ShipType() {
    return this.shipType;
  }
}

module.exports = Ship;
