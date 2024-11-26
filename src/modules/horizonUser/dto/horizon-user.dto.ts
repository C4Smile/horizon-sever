import { BlobDto } from "src/modules/image/dto/blob.dto";

// dto
import { ModelDto } from "src/modules/models/dto/model.dto";
import { HorizonRoleDto } from "src/modules/horizonRole/dto/horizon-role.dto";

export class HorizonUserDto extends ModelDto {
  name: string;
  username: string;
  phone: string;
  email: string;
  roleId: HorizonRoleDto;
  imageId: BlobDto;
}
