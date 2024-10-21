import { AutoMap } from "@automapper/classes";
import { BlobDto } from "src/modules/image/dto/blob.dto";

// dto
import { ModelDto } from "src/modules/models/dto/model.dto";
import { HorizonRoleDto } from "src/modules/horizonRole/dto/horizon-role.dto";

export class HorizonUserDto extends ModelDto {
  @AutoMap()
  name: string;

  @AutoMap()
  username: string;

  @AutoMap()
  address: string;

  @AutoMap()
  identification: string;

  @AutoMap()
  phone: string;

  @AutoMap()
  email: string;

  roleId: HorizonRoleDto;

  imageId: BlobDto;
}
