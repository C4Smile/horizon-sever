import { AddBlobDto } from "src/modules/image/dto/add-blob.dto";
import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateCannonDto extends UpdateModelDto {
  name: string;
  image: AddBlobDto;
  baseDamage: number;
  weight: number;
  description: string;
  creationTime: number;
}
