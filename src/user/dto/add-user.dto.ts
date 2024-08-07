// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddUserDto extends AddModelDto {
  email: string;
  phone: string;
  encrypted_password: string;
}
