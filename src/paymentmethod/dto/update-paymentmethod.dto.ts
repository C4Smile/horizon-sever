// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdatePaymentMethodDto extends UpdateModelDto {
  name?: string;
}
