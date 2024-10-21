// dto
import { ModelDto } from "src/modules/models/dto/model.dto";

export interface UserDto extends ModelDto {
  email: string;
  phone: string;
}
