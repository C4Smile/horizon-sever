import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddCannonDto extends AddModelDto {
  name: string;
  baseDamage: number;
  weight: number;
  description: string;
  creationTime: number;
}
