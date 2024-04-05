// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddPaymentMethodDto extends AddModelDto {
  name: string;
}
