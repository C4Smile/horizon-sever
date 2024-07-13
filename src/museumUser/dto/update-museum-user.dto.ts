// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateMuseumUserDto extends UpdateModelDto {
  name?: string;
  username?: string;
  address?: string;
  identification?: string;
  phone?: string;
  email?: string;
  roleId?: number;
}
