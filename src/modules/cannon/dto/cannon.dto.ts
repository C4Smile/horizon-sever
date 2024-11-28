import { ModelDto } from "src/modules/models/dto/model.dto";

export interface CannonDto extends ModelDto {
  name: string;
  baseDamage: number;
  weight: number;
  description: string;
  creationTime: number;
}
