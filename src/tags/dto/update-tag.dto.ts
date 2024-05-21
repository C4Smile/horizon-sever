// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateTagDto extends UpdateModelDto {
  name?: string;
}
