import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddBuildingTypeDto extends AddModelDto {
  name: string;
}
