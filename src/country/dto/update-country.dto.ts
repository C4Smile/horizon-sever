// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateCurrencyDto extends UpdateModelDto {
  name?: string;
  iso?: string;
}
