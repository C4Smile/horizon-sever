import { AddBlobDto } from "src/modules/image/dto/add-blob.dto";
import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddCannonDto extends AddModelDto {
  name: string;
  image: AddBlobDto;
  baseDamage: number;
  weight: number;
  description: string;
  creationTime: number;
}
