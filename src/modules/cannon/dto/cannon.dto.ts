import { BlobDto } from "src/modules/image/dto/blob.dto";
import { ModelDto } from "src/modules/models/dto/model.dto";

export interface CannonDto extends ModelDto {
  name: string;
  image: BlobDto;
  baseDamage: number;
  weight: number;
  description: string;
  creationTime: number;
}
