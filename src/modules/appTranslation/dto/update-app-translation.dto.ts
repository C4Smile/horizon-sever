// dto
import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateAppTranslationDto extends UpdateModelDto {
  name?: string;
  appId?: number;
}
