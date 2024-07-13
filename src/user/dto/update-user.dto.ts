// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateUserDto extends UpdateModelDto {
  email?: string;
  phone?: string;
  encrypted_password?: string;
}
