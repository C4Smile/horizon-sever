import { AutoMap } from "@automapper/classes";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

// entity
import { Lang } from "src/lang/lang.entity";
import { AppTranslation } from "src/modules/appTranslation/app-translation.entity";

/**
 * @class LangTranslation
 * @description Represents the relationship between a room and an image
 */
@Entity({ name: "lang-translations" })
export class LangTranslation {
  @AutoMap()
  @PrimaryColumn({ type: "int" })
  langId: number;

  @ManyToOne(() => Lang, (lang) => lang.langTranslations, {
    cascade: true,
  })
  lang: Lang;

  @AutoMap()
  @PrimaryColumn({ type: "int" })
  appTranslationId: number;

  @AutoMap()
  @ManyToOne(() => AppTranslation, (appTranslation) => appTranslation.langTranslations, {
    cascade: true,
  })
  appTranslation: AppTranslation;

  @AutoMap()
  @Column({ type: "text" })
  content: string;
}
