// @ts-check

const EntityTypeEnum = {
  None: 0,
  Ship: 1,
  Building: 2,
  Technology: 3,
  Hero: 4,
};

class Entity {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {object} price
   * @param {number} creationTime
   * @param {string[]} req
   * @param {number} type
   */
  constructor(
    id,
    name,
    price = {},
    creationTime = 0,
    req = [],
    type = EntityTypeEnum.None
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.creationTime = creationTime;
    this.req = req;
    this.type = type;
  }

  /**
   *
   * @param {string[]} technologies
   * @returns
   */
  isReady(technologies) {
    for (const item of this.req)
      if (technologies.indexOf(item) === -1) return false;
    return true;
  }

  get Id() {
    return this.id;
  }

  get Name() {
    return this.name;
  }

  get Req() {
    return this.req;
  }

  get Price() {
    return this.price;
  }

  get CreationTime() {
    return this.creationTime;
  }

  get Type() {
    return this.type;
  }
}

module.exports = { Entity, EntityTypeEnum };
