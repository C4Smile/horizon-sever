import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/modules/models/dto/model.dto";

export class AppTextDto extends ModelDto {
  @AutoMap()
  title: string;

  @AutoMap()
  urlName: string;

  @AutoMap()
  content: string;
}
