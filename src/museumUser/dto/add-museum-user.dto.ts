// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddMuseumUserDto extends AddModelDto {
  name: string;
  username: string;
  address: string;
  identification: string;
  phone: string;
  email: string;
  roleId: number;
}
