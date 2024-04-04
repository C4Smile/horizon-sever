import { Entity, Column } from "typeorm";
import { Model } from "src/models/model";

@Entity({ name: "users" })
export class User extends Model {
  @Column({ unique: true })
  username: string = "";

  @Column()
  password: string = "";

  @Column()
  name: string = "";

  @Column({ unique: true })
  email: string = "";

  @Column({ unique: true })
  phone: string = "";
}
