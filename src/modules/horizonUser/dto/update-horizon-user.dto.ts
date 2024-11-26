// dto
import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateHorizonUserDto extends UpdateModelDto {
  name?: string;
  username?: string;
  phone?: string;
  email?: string;
  roleId?: number;
}
