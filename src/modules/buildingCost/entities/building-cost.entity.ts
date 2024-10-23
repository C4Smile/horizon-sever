import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "building-cost" })
export class BuildingCost {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  buildingId: number;

  @Column({ type: "int" })
  resourceId: number;

  @Column({ type: "float" })
  cost: number;
}
