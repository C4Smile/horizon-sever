import { AutoMap } from "@automapper/classes";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

// entity
import { Lang } from "src/lang/lang.entity";
import { AppTranslation } from "src/appTranslation/app-translation.entity";

/**
 * @class LangTranslation
 * @description Represents the relationship between a room and an image
 */
@Entity({ name: "lang-translations" })
export class LangTranslation {
  @PrimaryColumn({ type: "int" })
  langId: number;

  @AutoMap()
  @ManyToOne(() => Lang, (lang) => lang.langTranslations, {
    cascade: true,
  })
  lang: Lang;

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
