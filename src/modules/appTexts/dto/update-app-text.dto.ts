// dto
import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateAppTextDto extends UpdateModelDto {
  title?: string;
  urlName?: string;
  content?: string;
}
