import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/dto/model.dto";

export class NextRoomDto extends ModelDto {
  @AutoMap()
  number: string;

  @AutoMap()
  name: string;

  @AutoMap()
  urlName: string;

  @AutoMap()
  description: string;

  image: string;
}
