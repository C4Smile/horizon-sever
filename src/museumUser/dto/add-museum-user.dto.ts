// dto
import { AddModelDto } from "src/models/dto/add-model.dto";

export interface AddMuseumUserDto extends AddModelDto {
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
