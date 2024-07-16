import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { MuseumRole } from "src/museumRole/museum-role.entity";
import { User } from "src/user/user.entity";

/**
 * @class MuseumUser
 * @description Represents an user
 */
@Entity({ name: "museumUser" })
export class MuseumUser extends Model {
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  username: string;

  @Column({ type: "text" })
  address: string = "";

  @Column({ type: "text", unique: true })
  identification: string;

  @Column({ type: "text", unique: true })
  phone: string;

  @Column({ type: "text", unique: true })
  email: string = "";

  @Column({ type: "int" })
  roleId: number;

  @ManyToOne(() => MuseumRole, (museumRole) => museumRole.museumUsers, { cascade: true })
  role: MuseumRole;

  @Column({ type: "int" })
  userId: number;

  @OneToOne(() => User, (user) => user.museumUser, { cascade: true })
  user: User;
}
