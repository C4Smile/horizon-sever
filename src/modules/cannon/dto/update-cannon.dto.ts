import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateCannonDto extends UpdateModelDto {
  name: string;
  baseDamage: number;
  weight: number;
  description: string;
  creationTime: number;
}
