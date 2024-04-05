// dto
import { ModelDto } from "src/models/model.dto";

export interface CurrencyDto extends ModelDto {
  name: string;
  reduction: string;
}
