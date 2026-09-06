import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddNationDto extends AddModelDto {
  name: string;
  description: string;
  playable: boolean;
}
