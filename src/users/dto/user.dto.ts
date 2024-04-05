// dto
import { ModelDto } from "src/models/model.dto";

export interface UserDto extends ModelDto {
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  identification: string;
}
