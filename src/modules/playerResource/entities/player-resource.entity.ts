import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { HorizonUser } from "src/modules/horizonUser/entities/horizon-user.entity";

/**
 * What one player holds of one resource. The catalogue row it points at lives
 * in `resources`; this is the stock, so it carries no soft delete or
 * timestamps and does not extend Model.
 */
@Entity({ name: "player-resources" })
export class PlayerResource {
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  /** the catalogue resource this is a stock of */
  @Column({ type: "int" })
  resourceId: number;

  @Column({ type: "int" })
  playerId: number;

  @ManyToOne(() => HorizonUser)
  player: HorizonUser;

  @Column({ type: "float" })
  inStock: number = 0;

  @Column({ type: "float" })
  maxCapacity: number = 0;

  /** how much a production tick adds, raised by the buildings that produce it */
  @Column({ type: "float" })
  currentFactor: number;
}
