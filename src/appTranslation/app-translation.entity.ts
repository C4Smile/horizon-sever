import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { App } from "src/app/app.entity";
import { Lang } from "src/lang/lang.entity";

/**
 * @class App
 * @description Represents a app translation
 */
@Entity({ name: "app-translation" })
export class AppTranslation extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  name: string = "";

  @Column({ type: "int" })
  appId: number;

  @AutoMap()
  @ManyToOne(() => App, (app) => app.translations, { cascade: true })
  app: App;

  @ManyToMany(() => Lang, (lang) => lang.translations)
  @JoinTable({
    name: "lang-translations",
    joinColumn: {
      name: "translationId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "translationLang",
    },
    inverseJoinColumn: {
      name: "langId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "langTranslation",
    },
  })
  langTranslations: Lang[];
}
