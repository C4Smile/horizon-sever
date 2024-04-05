// dto
import { ModelDto } from "src/models/model.dto";

export interface CountryDto extends ModelDto {
  name: string;
  iso: string;
}
