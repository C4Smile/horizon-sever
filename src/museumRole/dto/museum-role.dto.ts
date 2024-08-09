import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/dto/model.dto";

export class MuseumRoleDto extends ModelDto {
  @AutoMap()
  name: string;
}
