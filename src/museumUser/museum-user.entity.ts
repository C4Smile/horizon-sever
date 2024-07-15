import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { MuseumRole } from "src/museumrole/museum-role.entity";

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

  @ManyToOne(() => MuseumRole, (museumRole) => museumRole.museumUsers)
  role: MuseumRole;
}
