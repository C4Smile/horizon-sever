import { Column, Entity, ManyToOne } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { App } from "src/app/app.entity";

/**
 * @class App
 * @description Represents a app translation
 */
@Entity({ name: "app-translation" })
export class AppTranslation extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  name: string = "";

  @AutoMap()
  @Column({ type: "text" })
  language: string = "es";

  @AutoMap()
  @Column({ type: "text" })
  content: string = "es";

  @Column({ type: "int" })
  appId: number;

  @AutoMap()
  @ManyToOne(() => App, (app) => app.translations, { cascade: true })
  app: App;
}
