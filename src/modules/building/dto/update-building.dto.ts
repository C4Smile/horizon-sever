import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateBuildingDto extends UpdateModelDto {
  name?: string;
  baseFactor?: number;
  baseUpkeep?: number;
  description?: string;
}
