// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddExternalLinkDto extends AddModelDto {
  name: string;
  preview: string;
}
