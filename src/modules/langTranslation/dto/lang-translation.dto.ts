import { AutoMap } from "@automapper/classes";
import { LangDto } from "src/lang/dto/lang.dto";

export class LangTranslationDto {
  @AutoMap()
  langId: number;

  @AutoMap()
  appTranslationId: number;

  @AutoMap()
  content: string;
}
