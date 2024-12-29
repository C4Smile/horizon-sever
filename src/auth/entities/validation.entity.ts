import { Column, Entity, PrimaryColumn } from "typeorm";

/**
 * @class Validation
 * @description Represents a current user validation
 */
@Entity({ name: "validations" })
export class Validation {
  @PrimaryColumn({ type: "int" })
  userId: number;

  @Column({ type: "text" })
  token: string;

  @Column({
    nullable: true,
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  expireAt: Date;
}
