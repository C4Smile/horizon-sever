// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddTagDto extends AddModelDto {
  name: string;
}
