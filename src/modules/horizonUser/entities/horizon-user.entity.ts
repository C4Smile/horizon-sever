import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

// entities
import { User } from "../../user/user.entity";
import { Model } from "src/modules/models/model";
import { Photo } from "src/modules/image/image.entity";
import { HorizonRole } from "src/modules/horizonRole/entities/horizon-role.entity";
import { Resource } from "src/modules/resource/entities/resource.entity";

/**
 * @class HorizonUser
 * @description Represents an user
 */
@Entity({ name: "horizon-user" })
export class HorizonUser extends Model {
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  username: string;

  @Column({ type: "text" })
  phone: string;

  @Column({ type: "text" })
  email: string = "";

  @Column({ type: "int" })
  status: number = 0;

  @Column({ type: "int" })
  roleId: number;

  @ManyToOne(() => HorizonRole, (horizonRole) => horizonRole.horizonUsers, { cascade: true })
  role: HorizonRole;

  @OneToMany(() => Resource, (resource) => resource.player)
  resources: Resource[];

  @Column({ type: "int" })
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ type: "int" })
  imageId: number = 0;

  @ManyToOne(() => Photo)
  image: Photo;
}
