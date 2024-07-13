// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateNewsDto extends UpdateModelDto {
  title?: string;
  urlName?: string;
  description?: string;
  content?: string;
  subtitle?: string;
}
