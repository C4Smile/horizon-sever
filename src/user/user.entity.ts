import { Entity, Column } from "typeorm";
import { Model } from "src/models/model";

/**
 * @class User
 * @description Represents an user
 */
@Entity({ name: "users" })
export class User extends Model {
  @Column({ type: "text",  })
  email: string;

  @Column({ type: "text" })
  encrypted_password: string = "";

  @Column({ type: "text",  })
  phone: string;
}
