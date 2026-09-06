import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddNationDto extends AddModelDto {
  name: string;
  imageId?: number;
  iconId?: number;
  description: string;
  playable: boolean;
}
