import { Column, Entity } from "typeorm";

// dto
import { Model } from "src/modules/models/model";

@Entity({ name: "buildings" })
export class Building extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  baseFactor: number = 0;

  @Column({ type: "int" })
  baseUpkeep: number = 0;

  @Column({ type: "text" })
  description: string = "";
}
