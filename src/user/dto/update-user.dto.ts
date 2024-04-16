// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateUserDto extends UpdateModelDto {
  password?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  identification?: string;
}
