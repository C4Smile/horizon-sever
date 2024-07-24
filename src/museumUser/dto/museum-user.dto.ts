// dto
import { ModelDto } from "src/models/model.dto";
import { MuseumRoleDto } from "src/museumRole/dto/museum-role.dto";

export interface MuseumUserDto extends ModelDto {
  name: string;
  username: string;
  address: string;
  identification: string;
  phone: string;
  email: string;
  role: MuseumRoleDto;
}
