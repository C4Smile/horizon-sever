// dto
import { UpdateModelDto } from "src/models/dto/update-model.dto";

export interface UpdateActivityDto extends UpdateModelDto {
  title?: string;
  description?: string;
  entity?: string;
  imageId?: number;
}
