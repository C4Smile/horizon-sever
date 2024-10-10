import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { MuseumRole } from "src/museumRole/museum-role.entity";
import { User } from "src/user/user.entity";
import { Photo } from "src/image/image.entity";

/**
 * @class MuseumUser
 * @description Represents an user
 */
@Entity({ name: "museum-user" })
export class MuseumUser extends Model {
  @AutoMap()
  @Column({ type: "text" })
  name: string;

  @AutoMap()
  @Column({ type: "text",  })
  username: string;

  @AutoMap()
  @Column({ type: "text" })
  address: string = "";

  @AutoMap()
  @Column({ type: "text",  })
  identification: string;

  @AutoMap()
  @Column({ type: "text",  })
  phone: string;

  @AutoMap()
  @Column({ type: "text",  })
  email: string = "";

  @Column({ type: "int" })
  roleId: number;

  @AutoMap()
  @ManyToOne(() => MuseumRole, (museumRole) => museumRole.museumUsers, { cascade: true })
  role: MuseumRole;

  @Column({ type: "int" })
  userId: number;

  @AutoMap()
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ type: "int" })
  imageId: number = 0;

  @ManyToOne(() => Photo)
  image: Photo;
}
