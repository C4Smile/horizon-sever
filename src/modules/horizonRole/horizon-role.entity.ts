import { Column, Entity, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/modules/models/model";
import { HorizonUser } from "../horizonUser/horizon-user.entity";

/**
 * @class HorizonRole
 * @description Represents a role
 */
@Entity({ name: "Horizon-role" })
export class HorizonRole extends Model {
  @AutoMap()
  @Column({ type: "text",  })
  name: string = "";

  @OneToMany(() => HorizonUser, (horizonUser) => horizonUser.role)
  horizonUsers: HorizonUser[];
}
