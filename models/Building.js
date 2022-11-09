// @ts-check

const { Entity, EntityTypeEnum } = require("./Entity");
class ProductionType {
  /**
   *
   * @param {string} resource
   * @param {number} count
   */
  constructor(resource, count) {
    this.resource = resource;
    this.count = count;
    this.currentCount = count;
  }

  get Resource() {
    return this.Resource;
  }

  get Count() {
    return this.count;
  }

  get CurrentCount() {
    return this.currentCount;
  }

  set CurrentCount(newCount) {
    this.currentCount = newCount;
  }
}

class BuildingType {
  /**
   *
   * @param {string} id
   * @param {string} name
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  get Id() {
    return this.id;
  }

  get Name() {
    return this.name;
  }
}

class Building extends Entity {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {object} price
   * @param {BuildingType} buildingType
   * @param {ProductionType} production
   * @param {number} creationTime
   * @param {string[]} req
   */
  constructor(id, name, price, buildingType, production, creationTime, req) {
    super(id, name, price, creationTime, req, EntityTypeEnum.Building);
    this.currentPrice = { ...price };
    this.buildingType = buildingType;
    this.production = production;
  }

  createBuilding(
    options = {
      id: "",
      name: "",
      price: {},
      building: "",
      buildingType: {},
      production: {},
      creationTime: 0,
      req: [],
    }
  ) {
    const { id, name, price, type, production, creationTime, req } = options;
    this.id = id;
    this.name = name;
    this.price = price;
    this.creationTime = creationTime;
    this.currentPrice = { ...price };
    this.buildingType = new BuildingType(type.id, type.name);
    this.production = new ProductionType(production.resource, production.count);
    this.req = req;
    this.type = EntityTypeEnum.Building;
  }

  get BuildingType() {
    return this.buildingType;
  }

  get Production() {
    return this.production;
  }
}

module.exports = {
  Building,
  ProductionType,
};
