// dto
import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddUserDto extends AddModelDto {
  email: string;
  phone: string;
  password: string;
}
