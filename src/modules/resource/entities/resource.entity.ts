import { Column, Entity } from "typeorm";

// entities
import { Model } from "src/modules/models/model";

@Entity({ name: "resources" })
export class Resource extends Model {
  @Column({ type: "int" })
  playerId: number;

  @Column({ type: "int" })
  resourceId: number;

  @Column({ type: "float" })
  quantity: number = 0;
}
