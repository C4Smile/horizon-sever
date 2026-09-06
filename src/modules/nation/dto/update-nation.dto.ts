import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateNationDto extends UpdateModelDto {
  name: string;
  imageId?: number;
  iconId?: number;
  description: string;
  playable: boolean;
}
