import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { Photo } from "src/modules/image/image.entity";
import { TechType } from "src/modules/techType/entities/tech-type.entity";
import { TechCosts } from "src/modules/techCosts/entities/tech-costs.entity";
import { TechProduces } from "src/modules/techProduces/entities/tech-produces.entity";
import { TechReqTech } from "src/modules/techReqTech/entities/tech-req-tech.entity";
import { BuildingReqTech } from "src/modules/buildingReqTech/entities/building-req-tech.entity";
import { Building } from "src/modules/building/entities/building.entity";

@Entity({ name: "techs" })
export class Tech extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  imageId: number;

  @Column({ type: "int" })
  typeId: number = 0;

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "real" })
  creationTime: number = 0;

  @ManyToOne(() => Photo)
  image: Photo;

  @ManyToOne(() => TechType, { cascade: true })
  type: TechType;

  @OneToMany(() => TechProduces, (production) => production.tech)
  produces: TechProduces;

  @OneToMany(() => TechCosts, (cost) => cost.tech)
  costs: TechCosts[];

  @OneToMany(() => TechReqTech, (techReq) => techReq.tech)
  techRequirements: TechReqTech[];

  @OneToMany(() => BuildingReqTech, (building) => building.tech)
  buildingsRequireThis: Building[];
}
