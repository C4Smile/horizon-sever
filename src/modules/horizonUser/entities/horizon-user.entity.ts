import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

// entities
import { User } from "../../user/user.entity";
import { Model } from "src/modules/models/model";
import { Photo } from "src/modules/image/image.entity";
import { HorizonRole } from "src/modules/horizonRole/entities/horizon-role.entity";

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
  address: string = "";

  @Column({ type: "text" })
  identification: string;

  @Column({ type: "text" })
  phone: string;

  @Column({ type: "text" })
  email: string = "";

  @Column({ type: "int" })
  roleId: number;

  @ManyToOne(() => HorizonRole, (horizonRole) => horizonRole.horizonUsers, { cascade: true })
  role: HorizonRole;

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
