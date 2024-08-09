import { Column, Entity, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { MuseumUser } from "src/museumUser/museum-user.entity";

/**
 * @class MuseumRole
 * @description Represents a role
 */
@Entity({ name: "museum-role" })
export class MuseumRole extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  name: string = "";

  @OneToMany(() => MuseumUser, (museumUser) => museumUser.role)
  museumUsers: MuseumUser[];
}
