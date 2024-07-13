// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateActivityDto extends UpdateModelDto {
  title?: string;
  description?: string;
  entity?: string;
  imageId?: number;
}
