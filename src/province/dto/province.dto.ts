// dto
import { CountryDto } from "src/country/dto/country.dto";
import { ModelDto } from "src/models/model.dto";

export interface ProvinceDto extends ModelDto {
  name: string;
  country: CountryDto;
}
