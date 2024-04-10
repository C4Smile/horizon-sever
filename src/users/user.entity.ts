import { Entity, Column } from "typeorm";
import { Model } from "src/models/model";

/**
 * @class User
 * @description Represents an user
 */
@Entity({ name: "users" })
export class User extends Model {
  @Column({ unique: true })
  username: string;

  @Column({ type: "text" })
  password: string = "";

  @Column()
  name: string = "";

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  address: string = "";

  @Column({ unique: true })
  identification: string;

  /**
   * @param {number} id - user id
   * @param {string} username - username
   * @param {string} password - user password
   * @param {string} name - user name
   * @param {string} email - user email
   * @param {string} phone - user phone
   * @param {string} address - user address
   * @param {string} identification - user identification
   * @param {Date} dateOfCreation - user date of creation
   * @param {Date} lastUpdate - user last update
   * @param {boolean} deleted - user deleted
   */
  constructor(
    id: number,
    username: string,
    password: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    identification: string,
    dateOfCreation: Date = null,
    lastUpdate: Date = null,
    deleted: boolean = false,
  ) {
    super(id, dateOfCreation, lastUpdate, deleted);
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.identification = identification;
  }

  /**
   * @returns Name
   */
  get Name() {
    return this.name;
  }

  /**
   * @returns Email
   */
  get Email() {
    return this.email;
  }

  /**
   * @returns Username
   */
  get Username() {
    return this.username;
  }

  /**
   * @returns Password
   */
  get Password() {
    return this.password;
  }

  /**
   * @returns Phone
   */
  get Phone() {
    return this.phone;
  }

  /**
   * @returns Address
   */
  get Address() {
    return this.address;
  }

  /**
   * @returns Identification
   */
  get Identification() {
    return this.identification;
  }
}
