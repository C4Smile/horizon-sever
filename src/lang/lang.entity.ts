import { Column, Entity, ManyToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { AppTranslation } from "src/appTranslation/app-translation.entity";

/**
 * @class Lang
 * @description Represents a language
 */
@Entity({ name: "lang" })
export class Lang extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  name: string = "";

  @AutoMap()
  @Column({ type: "text", unique: true })
  code: string = "";

  @ManyToMany(() => AppTranslation, (appTranslation) => appTranslation.langTranslations, {
    cascade: true,
  })
  translations: AppTranslation[];
}
