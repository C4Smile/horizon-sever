// dto
import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddHorizonUserDto extends AddModelDto {
  address: string;
  email: string;
  identification: string;
  name: string;
  password: string;
  phone: string;
  roleId: number;
  imageId: number;
  username: string;
}
