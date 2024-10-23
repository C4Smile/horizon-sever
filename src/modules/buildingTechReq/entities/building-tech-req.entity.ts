import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "building-tech-req" })
export class BuildingTechReq {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  buildingId: number;

  @Column({ type: "int" })
  techId: number;

  @Column({ type: "int" })
  level: number;
}
