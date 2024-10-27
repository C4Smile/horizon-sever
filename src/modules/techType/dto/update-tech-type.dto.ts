import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateTechTypeDto extends UpdateModelDto {
  name: string;
}
