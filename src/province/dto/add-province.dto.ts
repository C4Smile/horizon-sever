// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddProvinceDto extends AddModelDto {
  name: string;
  countryId: number;
}
