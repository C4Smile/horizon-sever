import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateTechDto extends UpdateModelDto {
  name: string;
  imageId: number;
  typeId: number;
  description: string;
  creationTime: number;
}
