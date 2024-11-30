import { ModelDto } from "src/modules/models/dto/model.dto";

export interface ShipDto extends ModelDto {
  name: string;
  capacity: number;
  image: object;
  description: string;
  minKnots: number;
  maxKnots: number;
  minCrew: number;
  bestCrew: number;
  maxCrew: number;
  guns: number;
  creationTime: number;
}
