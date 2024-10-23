import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

// entity
import { Lang } from "src/modules/lang/lang.entity";
import { AppTranslation } from "src/modules/appTranslation/entities/app-translation.entity";


/**
 * @class LangTranslation
 * @description Represents the relationship between a room and an image
 */
@Entity({ name: "lang-translations" })
export class LangTranslation {
  @PrimaryColumn({ type: "int" })
  langId: number;

  @ManyToOne(() => Lang, (lang) => lang.langTranslations, {
    cascade: true,
  })
  lang: Lang;

  @PrimaryColumn({ type: "int" })
  appTranslationId: number;

  @ManyToOne(() => AppTranslation, (appTranslation) => appTranslation.langTranslations, {
    cascade: true,
  })
  appTranslation: AppTranslation;

  @Column({ type: "text" })
  content: string;
}
