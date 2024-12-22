import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { HorizonUser } from "../../horizonUser/entities/horizon-user.entity";

/**
 * @class HorizonRole
 * @description Represents a role
 */
@Entity({ name: "horizon-role" })
export class HorizonRole extends Model {
  @Column({ type: "text" })
  name: string = "";

  @OneToMany(() => HorizonUser, (horizonUser) => horizonUser.role)
  horizonUsers: HorizonUser[];
}

export enum HorizonRoleEnum {
  Admin = 1,
  Player = 2,
}
