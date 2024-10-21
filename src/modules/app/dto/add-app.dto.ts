// dto
import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddAppDto extends AddModelDto {
  name: string;
}
