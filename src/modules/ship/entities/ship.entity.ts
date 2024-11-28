import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// dto
import { Model } from "src/modules/models/model";
import { Photo } from "src/modules/image/image.entity";
import { ShipCost } from "src/modules/shipCost/entities/ship-cost.entity";
import { ShipUpkeep } from "src/modules/shipUpkeep/entities/ship-upkeep.entity";
import { ShipReqTech } from "src/modules/shipReqTech/entities/ship-req-tech.entity";
import { ShipReqBuilding } from "src/modules/shipReqBuilding/entities/ship-req-building.entity";

@Entity({ name: "ships" })
export class Ship extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  imageId: number;

  @Column({ type: "double" })
  capacity: number;

  @Column({ type: "double" })
  baseSpeed: number;

  @Column({ type: "int" })
  crew: number;

  @Column({ type: "int" })
  guns: number;

  @Column({ type: "double" })
  creationTime: number;

  @Column({ type: "text" })
  description: string = "";

  @ManyToOne(() => Photo)
  image: Photo;

  @OneToMany(() => ShipCost, (cost) => cost.ship)
  costs: ShipCost[];

  @OneToMany(() => ShipUpkeep, (upkeep) => upkeep.ship)
  upkeeps: ShipUpkeep[];

  @OneToMany(() => ShipReqTech, (techReq) => techReq.ship)
  techRequirements: ShipReqTech[];

  @OneToMany(() => ShipReqBuilding, (buildingReq) => buildingReq.ship)
  buildingRequirements: ShipReqBuilding[];
}
