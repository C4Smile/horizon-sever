import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { Photo } from "src/modules/image/image.entity";
import { CannonCost } from "src/modules/cannonCost/entities/cannon-cost.entity";
import { CannonReqTech } from "src/modules/cannonReqTech/entities/cannon-req-tech.entity";
import { CannonReqBuilding } from "src/modules/cannonReqBuilding/entities/cannon-req-building.entity";

@Entity({ name: "cannons" })
export class Cannon extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  imageId: number;

  @Column({ type: "int" })
  baseDamage: number = 0;

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "double" })
  weight: number;

  @Column({ type: "double" })
  creationTime: number;

  @ManyToOne(() => Photo)
  image: Photo;

  @OneToMany(() => CannonCost, (cost) => cost.cannon)
  costs: CannonCost[];

  @OneToMany(() => CannonReqTech, (cost) => cost.cannon)
  techRequirements: CannonReqTech[];

  @OneToMany(() => CannonReqBuilding, (cost) => cost.cannon)
  buildingRequirements: CannonReqBuilding[];
}
