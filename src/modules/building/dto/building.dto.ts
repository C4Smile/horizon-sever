import { ModelDto } from "src/modules/models/dto/model.dto";

export interface BuildingDto extends ModelDto {
  name: string;
  baseFactor: number;
  baseUpkeep: number;
  description: string;
}
