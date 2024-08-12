// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddMuseumUserDto extends AddModelDto {
  name: string;
  username: string;
  address: string;
  identification: string;
  password: string;
  phone: string;
  email: string;
  roleId: number;
}
