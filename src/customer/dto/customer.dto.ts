// dto
import { CountryDto } from "src/country/dto/country.dto";
import { ModelDto } from "src/models/model.dto";

export interface CustomerDto extends ModelDto {
  name: string;
  email: string;
  phone: string;
  address: string;
  identification: string;
  country: CountryDto;
}
