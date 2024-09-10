// dto
import { UpdateModelDto } from "src/models/dto/update-model.dto";

export interface UpdateAppTranslationDto extends UpdateModelDto {
  name?: string;
  language?: string;
  content?: string;
}
