import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { Building } from "src/modules/building/entities/building.entity";
import { Photo } from "src/modules/image/image.entity";
import { Tech } from "src/modules/tech/entities/tech.entity";
import { TechProduces } from "src/modules/techProduces/entities/tech-produces.entity";
import { BuildingCost } from "src/modules/buildingCost/entities/building-cost.entity";
import { BuildingUpkeep } from "src/modules/buildingUpkeep/entities/building-upkeep.entity";
import { TechCost } from "src/modules/techCost/entities/tech-cost.entity";
import { BuildingProduces } from "src/modules/buildingProduces/entities/building-produces.entity";
import { Ship } from "src/modules/ship/entities/ship.entity";
import { ShipCost } from "src/modules/shipCost/entities/ship-cost.entity";
import { ShipUpkeep } from "src/modules/shipUpkeep/entities/ship-upkeep.entity";

@Entity({ name: "resources" })
export class Resource extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  imageId: number;

  @Column({ type: "int" })
  baseFactor: number = 0;

  @Column({ type: "text" })
  description: string = "";

  @OneToMany(() => BuildingCost, (cost) => cost.resource)
  buildingsCostThis: BuildingCost[];

  @OneToMany(() => BuildingProduces, (produce) => produce.resource)
  buildingsProduceThis: Building[];

  @OneToMany(() => BuildingUpkeep, (produce) => produce.resource)
  buildingsUpkeepThis: Building[];

  @OneToMany(() => TechCost, (cost) => cost.resource)
  techCosts: TechCost[];

  @OneToMany(() => TechProduces, (produce) => produce.resource)
  techsProduceThis: Tech[];

  @OneToMany(() => ShipCost, (cost) => cost.resource)
  shipsCostThis: Ship[];

  @OneToMany(() => ShipUpkeep, (produce) => produce.resource)
  shipsUpkeepThis: Ship[];

  @ManyToOne(() => Photo)
  image: Photo;

  @OneToMany(() => ShipCost, (cost) => cost.resource)
  cannonsCostThis: Ship[];
}
