import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/modules/models/dto/model.dto";

export class HorizonRoleDto extends ModelDto {
  @AutoMap()
  name: string;
}
