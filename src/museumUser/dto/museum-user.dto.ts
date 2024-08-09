import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/dto/model.dto";
import { MuseumRoleDto } from "src/museumRole/dto/museum-role.dto";

export class MuseumUserDto extends ModelDto {
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

  @AutoMap()
  role: MuseumRoleDto;
}
