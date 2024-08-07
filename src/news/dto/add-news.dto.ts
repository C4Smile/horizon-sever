// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddNewsDto extends AddModelDto {
  title: string;
  urlName: string;
  description: string;
  content: string;
  subtitle: string;
}
