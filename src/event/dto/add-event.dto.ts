// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddEventDto extends AddModelDto {
  title: string;
}
