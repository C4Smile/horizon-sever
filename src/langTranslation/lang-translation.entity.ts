import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryColumn } from "typeorm";

/**
 * @class LangTranslation
 * @description Represents the relationship between a room and an image
 */
@Entity({ name: "lang-translations" })
export class LangTranslation {
  @AutoMap()
  @PrimaryColumn({ type: "int" })
  appId: number;

  @AutoMap()
  @PrimaryColumn({ type: "int" })
  translationId: number;

  @AutoMap()
  @Column({type:"text"})
  content: string;
}
