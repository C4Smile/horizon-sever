import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddTechDto extends AddModelDto {
  name: string;
  typeId: number;
  imageId: number;
  description: string;
  creationTime: number;
}
