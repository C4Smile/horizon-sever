import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { App } from "src/modules/app/entities/app.entity";
import { LangTranslation } from "src/modules/langTranslation/entities/lang-translation.entity";

/**
 * @class App
 * @description Represents a app translation
 */
@Entity({ name: "app-translation" })
export class AppTranslation extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  appId: number;

  @ManyToOne(() => App, (app) => app.translations, { cascade: true })
  app: App;

  @OneToMany(() => LangTranslation, (langTranslation) => langTranslation.appTranslation)
  langTranslations: LangTranslation[];
}
