import { Entity, Column, ManyToOne } from "typeorm";
import { Model } from "src/models/model";

// entity
import { Photo } from "src/image/image.entity";

/**
 * @class User
 * @description Represents an user
 */
@Entity({ name: "users" })
export class User extends Model {
  @Column({ type: "text", unique: true })
  username: string;

  @Column({ type: "text" })
  password: string = "";

  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text", unique: true })
  phone: string;

  @Column({ type: "text" })
  address: string = "";

  @Column({ type: "text", unique: true })
  identification: string;

  @Column({ type: "int8" })
  photoId: number;

  @ManyToOne(() => Photo, (image) => image.Users)
  photo: Photo;

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

  /**
   * @returns PhotoId
   */
  get PhotoId() {
    return this.photoId;
  }

  /**
   * @returns Photo
   */
  get Photo() {
    return this.photo;
  }
}
