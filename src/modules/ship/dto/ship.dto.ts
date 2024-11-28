import { ModelDto } from "src/modules/models/dto/model.dto";

export interface ShipDto extends ModelDto {
  name: string;
  capacity: number;
  image: object;
  description: string;
  baseSpeed: number;
  crew: number;
  guns: number;
  creationTime: number;
}
