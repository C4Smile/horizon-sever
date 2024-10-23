import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "building-upkeep" })
export class BuildingUpkeep {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  buildingId: number;

  @Column({ type: "int" })
  resourceId: number;

  @Column({ type: "float" })
  cost: number;
}
