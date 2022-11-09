// @ts-check
const { Entity, EntityTypeEnum } = require("./Entity");

const UserStatusEnum = {
  Offline: 0,
  Online: 1,
};

class User {
  /**
   *
   * @param {string} id
   * @param {string} user
   * @param {string} nick
   * @param {string} email
   * @param {string} password
   * @param {string} nation
   * @param {number} state
   * @param {number} lastOnline
   * @param {object} resources
   * @param {object} buildings
   * @param {object} technologies
   * @param {object} ships
   */
  constructor(
    id = "",
    user = "",
    nick = "",
    email = "",
    password = "",
    nation = "",
    state = UserStatusEnum.Offline,
    lastOnline = 0,
    resources = {},
    buildings = {},
    technologies = {},
    ships = {}
  ) {
    this.id = id;
    this.user = user;
    this.nick = nick;
    this.email = email;
    this.password = password;
    this.nation = nation;
    this.state = state;
    this.lastOnline = lastOnline;
    this.resources = resources;
    this.buildings = buildings;
    this.technologies = technologies;
    this.ships = ships;
  }

  createUser(
    options = {
      id: "",
      user: "",
      nick: "",
      email: "",
      password: "",
      nation: "",
      state: UserStatusEnum.Offline,
      lastOnline: 0,
      resources: {},
      buildings: {},
      technologies: {},
      ships: {},
    }
  ) {
    const {
      id,
      user,
      nick,
      email,
      password,
      nation,
      state,
      lastOnline,
      resources,
      technologies,
      buildings,
      ships,
    } = options;
    this.id = id;
    this.user = user;
    this.nick = nick;
    this.email = email;
    this.password = password;
    this.nation = nation;
    this.state = state;
    this.lastOnline = lastOnline;
    this.resources = resources;
    this.technologies = technologies;
    this.buildings = buildings;
    this.ships = ships;
  }

  toBd() {
    return {
      id: this.id,
      user: this.user,
      nick: this.nick,
      email: this.email,
      password: this.password,
      nation: this.nation,
      state: this.state,
      lastOnline: this.lastOnline,
      resources: this.resources,
      buildings: this.buildings,
      technologies: this.technologies,
      ships: this.ships,
    };
  }

  getTechnologies() {
    const technologies = [];
    // technologies
    Object.keys(this.technologies).forEach((item) => {
      technologies.push(item);
    });
    // buildings
    Object.keys(this.buildings).forEach((item) => {
      technologies.push(item);
    });
    // ships
    Object.keys(this.ships).forEach((item) => {
      technologies.push(item);
    });
    return technologies;
  }

  /**
   *
   * @param {Entity} technology
   * @param {number} count
   */
  canMake(technology, count = 1) {
    for (const item of Object.keys(technology.Price))
      if (this.resources[item] < technology.Price[item] * count) return false;
    return true;
  }

  /**
   *
   * @param {Entity} technology
   * @param {number} count
   */
  make(technology, count = 1) {
    // validating again
    for (const item of Object.keys(technology.Price))
      if (this.resources[item] < technology.Price[item] * count) return false;
    for (const item of Object.keys(technology.Price))
      this.resources[item] -= technology.Price[item] * count;
    return { technology, count };
  }

  /**
   *
   * @param {Entity} technology
   * @param {number} count
   * @returns
   */
  addTechnology(technology, count) {
    switch (technology.Type) {
      case EntityTypeEnum.Ship:
        this.ships[technology.Id] = { count };
      case EntityTypeEnum.Building:
        this.buildings[technology.Id] = {
          level: count,
          // @ts-ignore
          productionType: technology.production,
          // @ts-ignore
          buildingType: technology.buildingType,
        };
      case EntityTypeEnum.Technology:
        this.technologies[technology.Id] = {
          level: count,
        };
      default: // none
        break;
    }
  }

  getProductionCycle() {}

  get Id() {
    return this.id;
  }

  get User() {
    return this.user;
  }

  get Nick() {
    return this.nick;
  }

  set Nick(newNick) {
    this.nick = newNick;
  }

  get Email() {
    return this.email;
  }

  set Email(newEmail) {
    this.email = newEmail;
  }

  get Password() {
    return this.password;
  }

  set Password(newPassword) {
    this.password = newPassword;
  }

  get Nation() {
    return this.nation;
  }

  get State() {
    return this.state;
  }

  set State(newState) {
    this.state = newState;
  }

  get LastOnline() {
    return this.lastOnline;
  }

  set LastOnline(newLastOnline) {
    this.lastOnline = newLastOnline;
  }

  get Resources() {
    return this.resources;
  }

  /**
   *
   * @param {string} resource
   * @param {number} count
   */
  modifyResource(resource, count = 0) {
    this.resources[resource] += count;
  }

  get Buildings() {
    return this.buildings;
  }

  /**
   *
   * @param {string} building
   * @param {number} count
   */
  addBuildings(building, count = 1) {
    if (!this.buildings[building]) this.buildings[building] = count;
    else this.buildings[building] += count;
  }

  /**
   *
   * @param {string} building
   * @param {number} count
   */
  removeBuildings(building, count = 1) {
    if (this.buildings[building]) this.buildings[building] -= count;
    if (this.buildings[building] < 0) this.buildings[building] = 0;
  }

  /**
   *
   * @param {string} technology
   * @param {number} level
   */
  addTechnologies(technology, level = 1) {
    if (!this.technologies[technology]) this.technologies[technology] = level;
    else this.technologies[technology] += level;
  }

  get Ships() {
    return this.ships;
  }

  /**
   *
   * @param {string} ship
   * @param {number} count
   */
  addShips(ship, count = 1) {
    if (!this.ships[ship]) this.ships[ship] = count;
    else this.ships[ship] += count;
  }

  /**
   *
   * @param {string} ship
   * @param {number} count
   */
  removeShips(ship, count = 1) {
    if (this.ships[ship]) this.ships[ship] -= count;
    if (this.ships[ship] < 0) this.ships[ship] = 0;
  }
}

module.exports = { User, UserStatusEnum };
