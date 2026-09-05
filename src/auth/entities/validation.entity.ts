import { Column, Entity, PrimaryColumn } from "typeorm";

/**
 * @class Validation
 * @description The pending email confirmation of one player, one row per
 * player, replaced whenever a new one is sent.
 */
@Entity({ name: "validations" })
export class Validation {
  @PrimaryColumn({ type: "int" })
  userId: number;

  @Column({ type: "text" })
  token: string;

  @Column({ nullable: true, type: "datetime" })
  expireAt: Date;
}
