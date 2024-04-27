// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateNewsDto extends UpdateModelDto {
  title?: string;
}
