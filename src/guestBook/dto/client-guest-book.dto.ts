import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/dto/model.dto";

export class ClientGuestBookDto extends ModelDto {
  @AutoMap()
  name: string;

  @AutoMap()
  urlName: string;

  date: string;

  images: string[];
}
