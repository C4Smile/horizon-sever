import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateShipDto extends UpdateModelDto {
  name: string;
  capacity: number;
  imageId: number;
  description: string;
  baseSpeed: number;
  minCrew: number;
  bestCrew: number;
  maxCrew: number;
  guns: number;
  creationTime: number;
}
