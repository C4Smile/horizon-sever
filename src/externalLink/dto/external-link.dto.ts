import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/dto/model.dto";

export class ExternalLinkDto extends ModelDto {
  @AutoMap()
  name: string;

  @AutoMap()
  preview: string;
}
