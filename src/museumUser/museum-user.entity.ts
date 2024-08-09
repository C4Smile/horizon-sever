import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { MuseumRole } from "src/museumRole/museum-role.entity";
import { User } from "src/user/user.entity";

/**
 * @class MuseumUser
 * @description Represents an user
 */
@Entity({ name: "museum-user" })
export class MuseumUser extends Model {
  @AutoMap()
  @Column({ type: "text" })
  name: string;

  @AutoMap()
  @Column({ type: "text", unique: true })
  username: string;

  @AutoMap()
  @Column({ type: "text" })
  address: string = "";

  @AutoMap()
  @Column({ type: "text", unique: true })
  identification: string;

  @AutoMap()
  @Column({ type: "text", unique: true })
  phone: string;

  @AutoMap()
  @Column({ type: "text", unique: true })
  email: string = "";

  @Column({ type: "int" })
  roleId: number;

  @AutoMap()
  @ManyToOne(() => MuseumRole, (museumRole) => museumRole.museumUsers, { cascade: true })
  role: MuseumRole;

  @Column({ type: "int" })
  userId: number;

  @AutoMap()
  @OneToOne(() => User, (user) => user.museumUser, { cascade: true })
  user: User;
}
