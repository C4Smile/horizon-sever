import { Entity, Column } from "typeorm";
import { Model } from "src/models/model";

/**
 * @class User
 * @description Represents an user
 */
@Entity({ name: "user" })
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
