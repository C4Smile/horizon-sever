import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateResourceDto extends UpdateModelDto {
  name: string;
  baseFactor: number;
  description: string;
}
