import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateBuildingDto extends UpdateModelDto {
  name: string;
  imageId: number;
  creationTime: number;
  description: string;
}
