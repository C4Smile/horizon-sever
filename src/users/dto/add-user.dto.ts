// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddUserDto extends AddModelDto {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  identification: string;
}
