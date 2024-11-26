// dto
import { AddModelDto } from "src/modules/models/dto/add-model.dto";

export interface AddHorizonUserDto extends AddModelDto {
  email: string;
  name: string;
  password: string;
  phone: string;
  roleId: number;
  imageId: number;
  username: string;
}
