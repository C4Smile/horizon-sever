// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddCountryDto extends AddModelDto {
  name: string;
  iso: string;
}
