// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateAppTextDto extends UpdateModelDto {
  title?: string;
  urlName?: string;
  content?: string;
}