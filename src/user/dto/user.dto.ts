// dto
import { ModelDto } from "src/models/model.dto";

export interface UserDto extends ModelDto {
  email: string;
  phone: string;
}
