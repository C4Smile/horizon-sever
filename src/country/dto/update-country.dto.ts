// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateCountryDto extends UpdateModelDto {
  name?: string;
  iso?: string;
}
