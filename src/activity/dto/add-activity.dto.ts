// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddActivityDto extends AddModelDto {
  title: string;
  description: string;
  entity: string;
  imageId: number;
}
