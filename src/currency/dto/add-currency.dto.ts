// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddCurrencyDto extends AddModelDto {
  name: string;
  reduction: string;
}
