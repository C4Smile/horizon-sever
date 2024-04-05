// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddCustomerDto extends AddModelDto {
  name: string;
  email: string;
  phone: string;
  address: string;
  identification: string;
  countryId: number;
}
