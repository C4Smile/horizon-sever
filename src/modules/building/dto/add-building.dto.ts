import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddBuildingDto extends AddModelDto {
  name: string;
  imageId: number;
  description: string;
}
