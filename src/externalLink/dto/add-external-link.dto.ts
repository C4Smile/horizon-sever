// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddExternalLinkDto extends AddModelDto {
  name: string;
  preview: string;
}
