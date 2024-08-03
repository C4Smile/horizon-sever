import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/model.dto";

export class ClientGuestBookDto extends ModelDto {
  @AutoMap()
  name: string;

  @AutoMap()
  urlName: string;

  @AutoMap()
  description: string;

  @AutoMap()
  content: string;

  images: string[];
}
