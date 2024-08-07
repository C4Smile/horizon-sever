// dto
import { UpdateModelDto } from "src/models/dto/update-model.dto";

export interface UpdateTagDto extends UpdateModelDto {
  name?: string;
}
