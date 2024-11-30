import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddShipDto extends AddModelDto {
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
