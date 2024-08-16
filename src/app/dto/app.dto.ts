import { ModelDto } from "src/models/dto/model.dto";

// dto
import { AutoMap } from "@automapper/classes";

export class AppDto extends ModelDto {
  @AutoMap()
  name: string;
}
