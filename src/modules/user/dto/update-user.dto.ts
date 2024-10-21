// dto
import { UpdateModelDto } from "src/modules/models/dto/update-model.dto";

export interface UpdateUserDto extends UpdateModelDto {
  email?: string;
  phone?: string;
  encrypted_password?: string;
}
