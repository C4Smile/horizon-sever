import { ModelDto } from "src/modules/models/dto/model.dto";

// dto
import { LangTranslationDto } from "src/modules/langTranslation/dto/lang-translation.dto";

export class AppTranslationDto extends ModelDto {
  name: string;
  appId: number;
  langTranslations: LangTranslationDto[];
}
