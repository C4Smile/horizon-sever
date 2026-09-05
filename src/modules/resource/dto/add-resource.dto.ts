import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddResourceDto extends AddModelDto {
  name: string;
  imageId: number;
  iconId?: number;
  baseFactor: number;
  description: string;
}
