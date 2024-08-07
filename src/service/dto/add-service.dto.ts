// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddServiceDto extends AddModelDto {
  name: string;
  urlName: string;
  description: string;
  content: string;
  imageId: number;
}
