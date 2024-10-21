import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/modules/models/model";
import { App } from "src/modules/app/app.entity";
import { LangTranslation } from "../langTranslation/lang-translation.entity";

/**
 * @class App
 * @description Represents a app translation
 */
@Entity({ name: "app-translation" })
export class AppTranslation extends Model {
  @AutoMap()
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  appId: number;

  @AutoMap()
  @ManyToOne(() => App, (app) => app.translations, { cascade: true })
  app: App;

  @AutoMap()
  @OneToMany(() => LangTranslation, (langTranslation) => langTranslation.appTranslation)
  langTranslations: LangTranslation[];
}
