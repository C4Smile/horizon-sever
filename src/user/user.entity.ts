import { Entity, Column, OneToOne } from "typeorm";
import { Model } from "src/models/model";
import { MuseumUser } from "src/museumUser/museum-user.entity";

/**
 * @class User
 * @description Represents an user
 */
@Entity({ name: "users" })
export class User extends Model {
  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  encrypted_password: string = "";

  @Column({ type: "text", unique: true })
  phone: string;

  @OneToOne(() => MuseumUser, (user) => user.user)
  museumUser: MuseumUser;
}
