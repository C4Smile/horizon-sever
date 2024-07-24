import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/model.dto";

export class RoomTypeDto extends ModelDto {
  @AutoMap()
  name: string;
}
