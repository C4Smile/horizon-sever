import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { App } from "src/app/app.entity";
import { MuseumUser } from "src/museumUser/museum-user.entity";

@Entity({ name: "chat-log" })
export class ChatLog {
  @AutoMap()
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  @Column({ type: "text" })
  message: string;

  @Column({ type: "int" })
  userId: number;

  @AutoMap()
  @ManyToOne(() => MuseumUser)
  user: MuseumUser;

  @Column({ type: "int" })
  senderId: number;

  @AutoMap()
  @ManyToOne(() => MuseumUser)
  sender: MuseumUser;

  @AutoMap()
  @Column({
    type: "datetime",
  })
  sentDate: Date;

  @Column({ type: "int" })
  fromApp: number;

  @AutoMap()
  @ManyToOne(() => App)
  app: App;
}
