import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddTechTypeDto extends AddModelDto {
  name: string;
}
