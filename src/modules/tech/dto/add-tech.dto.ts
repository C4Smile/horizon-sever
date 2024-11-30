import { AddModelDto } from "src/modules/models/dto/add-model.dto";
import { TechTypeDto } from "src/modules/techType/dto/tech-type.dto";

export interface AddTechDto extends AddModelDto {
  name: string;
  type: TechTypeDto;
  imageId: number;
  description: string;
  creationTime: number;
}
