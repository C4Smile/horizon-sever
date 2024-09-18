import { ModelDto } from "src/models/dto/model.dto";

// dto
import { AutoMap } from "@automapper/classes";
import { LangTranslationDto } from "src/langTranslation/dto/lang-translation.dto";

export class AppTranslationDto extends ModelDto {
  @AutoMap()
  name: string;

  @AutoMap()
  appId: number;

  @AutoMap()
  langTranslations: LangTranslationDto[];
}
