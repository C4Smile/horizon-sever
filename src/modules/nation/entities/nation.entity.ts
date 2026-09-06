import { Column, Entity } from "typeorm";

// entities
import { Model } from "src/modules/models/model";

/**
 * A nation a player can belong to. Not every one is playable: the taínos and
 * the caribs are there as a presence in the world, not as a choice.
 */
@Entity({ name: "nations" })
export class Nation extends Model {
  @Column({ type: "text" })
  name: string = "";

  // no column default: mysql does not allow one on a text column
  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "boolean", default: true })
  playable: boolean = true;
}
