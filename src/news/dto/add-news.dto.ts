// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddNewsDto extends AddModelDto {
  title: string;
  description: string;
  provinceId: number;
  photoId: number;
  tagsId: number[];
}
