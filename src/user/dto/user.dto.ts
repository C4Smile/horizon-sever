// dto
import { ModelDto } from "src/models/dto/model.dto";

export interface UserDto extends ModelDto {
  email: string;
  phone: string;
}
