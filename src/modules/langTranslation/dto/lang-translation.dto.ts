import { AutoMap } from "@automapper/classes";

export class LangTranslationDto {
  @AutoMap()
  langId: number;

  @AutoMap()
  appTranslationId: number;

  @AutoMap()
  content: string;
}
