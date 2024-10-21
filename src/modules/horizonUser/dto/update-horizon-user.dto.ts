// dto
import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateHorizonUserDto extends UpdateModelDto {
  name?: string;
  username?: string;
  address?: string;
  identification?: string;
  phone?: string;
  email?: string;
  roleId?: number;
}
