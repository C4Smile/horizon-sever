// dto
import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateLangDto extends UpdateModelDto {
  name?: string;
  code?: string;
}
