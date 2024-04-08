// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateCustomerDto extends UpdateModelDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  identification?: string;
  countryId?: number;
}
