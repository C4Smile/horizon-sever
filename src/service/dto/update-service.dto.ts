// dto
import { UpdateModelDto } from "src/models/dto/update-model.dto";

export interface UpdateServiceDto extends UpdateModelDto {
  name?: string;
  urlName?: string;
  description?: string;
  content?: string;
  imageId?: number;
}