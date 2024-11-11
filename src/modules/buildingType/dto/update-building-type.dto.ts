import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateBuildingTypeDto extends UpdateModelDto {
  name: string;
}
