// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddAppTextDto extends AddModelDto {
  title: string;
  urlName: string;
  content: string;
}
