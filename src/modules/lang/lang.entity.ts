import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/modules/models/model";
import { LangTranslation } from "../langTranslation/lang-translation.entity";

/**
 * @class Lang
 * @description Represents a language
 */
@Entity({ name: "lang" })
export class Lang extends Model {
  @AutoMap()
  @Column({ type: "text",  })
  name: string = "";

  @AutoMap()
  @Column({ type: "text",  })
  code: string = "";

  @AutoMap()
  @OneToMany(() => LangTranslation, (langTranslation) => langTranslation.lang)
  langTranslations: LangTranslation[];
}
