import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateShipDto extends UpdateModelDto {
  name: string;
  capacity: number;
  imageId: number;
  description: string;
  knots: number;
  minCrew: number;
  bestCrew: number;
  maxCrew: number;
  guns: number;
  creationTime: number;
  hull: number;
}