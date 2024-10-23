import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { LangTranslation } from "../langTranslation/entities/lang-translation.entity";

/**
 * @class Lang
 * @description Represents a language
 */
@Entity({ name: "lang" })
export class Lang extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "text" })
  code: string = "";

  @OneToMany(() => LangTranslation, (langTranslation) => langTranslation.lang)
  langTranslations: LangTranslation[];
}
