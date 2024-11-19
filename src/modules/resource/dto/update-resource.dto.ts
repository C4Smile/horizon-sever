import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateResourceDto extends UpdateModelDto {
  name: string;
  imageId: number;
  baseFactor: number;
  description: string;
}
