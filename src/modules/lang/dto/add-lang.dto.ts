// dto
import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddLangDto extends AddModelDto {
  name: string;
  code: string;
}
