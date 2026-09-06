import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateNationDto extends UpdateModelDto {
  name: string;
  description: string;
  playable: boolean;
}
