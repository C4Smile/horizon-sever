// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateProvinceDto extends UpdateModelDto {
  name?: string;
  countryId?: number;
}
