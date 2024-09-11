import { ModelDto } from "src/models/dto/model.dto";

// dto
import { AutoMap } from "@automapper/classes";

export class LangDto extends ModelDto {
  @AutoMap()
  name: string;

  @AutoMap()
  code: string;
}
