import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/model.dto";

export class NextRoomDto extends ModelDto {
  @AutoMap()
  number: number;

  @AutoMap()
  name: string;

  @AutoMap()
  urlName: string;

  @AutoMap()
  description: string;

  image: string;
}
