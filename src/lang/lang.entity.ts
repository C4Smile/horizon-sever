import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { LangTranslation } from "src/langTranslation/lang-translation.entity";

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

  @AutoMap()
  @OneToMany(() => LangTranslation, (langTranslation) => langTranslation.lang)
  langTranslations: LangTranslation[];
}
