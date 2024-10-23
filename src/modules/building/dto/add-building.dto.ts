import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddBuildingDto extends AddModelDto {
  name: string;
  baseFactor: number;
  baseUpkeep: number;
  description: string;
}
