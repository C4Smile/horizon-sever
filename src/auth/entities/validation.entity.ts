import { Column, Entity, PrimaryColumn } from "typeorm";

/**
 * @class Validation
 * @description Represents a current user validation
 */
@Entity({ name: "validation" })
export class Validation {
  @PrimaryColumn({ type: "int" })
  userId: number;

  @Column({ type: "text" })
  token: string;
}
