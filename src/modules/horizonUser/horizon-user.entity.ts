import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { User } from "../user/user.entity";
import { Model } from "src/modules/models/model";
import { Photo } from "src/modules/image/image.entity";
import { HorizonRole } from "src/modules/horizonRole/horizon-role.entity";

/**
 * @class HorizonUser
 * @description Represents an user
 */
@Entity({ name: "horizon-user" })
export class HorizonUser extends Model {
  @AutoMap()
  @Column({ type: "text" })
  name: string;

  @AutoMap()
  @Column({ type: "text" })
  username: string;

  @AutoMap()
  @Column({ type: "text" })
  address: string = "";

  @AutoMap()
  @Column({ type: "text" })
  identification: string;

  @AutoMap()
  @Column({ type: "text" })
  phone: string;

  @AutoMap()
  @Column({ type: "text" })
  email: string = "";

  @Column({ type: "int" })
  roleId: number;

  @AutoMap()
  @ManyToOne(() => HorizonRole, (horizonRole) => horizonRole.horizonUsers, { cascade: true })
  role: HorizonRole;

  @Column({ type: "int" })
  userId: number;

  @AutoMap()
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ type: "int" })
  imageId: number = 0;

  @ManyToOne(() => Photo)
  image: Photo;
}
