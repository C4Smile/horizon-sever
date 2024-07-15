import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { MuseumUser } from "src/museumUser/museum-user.entity";

/**
 * @class MuseumRole
 * @description Represents a role
 */
@Entity({ name: "museumRole" })
export class MuseumRole extends Model {
  @Column({ type: "text", unique: true })
  name: string = "";

  @OneToMany(() => MuseumUser, (museumUser) => museumUser.role)
  museumUsers: MuseumUser[];
}
